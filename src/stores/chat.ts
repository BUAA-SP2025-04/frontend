import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { wsService } from '@/utils/websocket'
import { chatAPI } from '@/api/modules/chat'
import { ElMessage } from 'element-plus'
import { useUserStore } from './user'

export interface Message {
  id: string
  conversationId: string
  senderId: number
  receiverId: number
  type: 'text' | 'image' | 'file' | 'system'
  content: string
  fileInfo?: {
    name: string
    size: number
    url: string
    mimeType: string
  }
  status: 'sending' | 'sent' | 'delivered' | 'read'
  createdAt: string
  updatedAt: string
}

export interface Conversation {
  id: string
  participants: ChatUser[]
  lastMessage?: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
}

export interface ChatUser {
  id: number
  name: string
  avatar: string
  institution: string
  isOnline: boolean
  lastSeen: string
}

export interface TypingStatus {
  [conversationId: string]: {
    [userId: number]: boolean
  }
}

export const useChatStore = defineStore('chat', () => {
  const userStore = useUserStore()

  // 状态
  const conversations = ref<Conversation[]>([])
  const currentConversation = ref<Conversation | null>(null)
  const messages = ref<{ [conversationId: string]: Message[] }>({})
  const chatUsers = ref<{ [userId: number]: ChatUser }>({})
  const onlineUsers = ref<Set<number>>(new Set())
  const typingStatus = ref<TypingStatus>({})
  const isConnected = ref(false)
  const connectionStatus = ref<'connecting' | 'connected' | 'disconnected' | 'reconnecting'>(
    'disconnected'
  )

  // 计算属性
  const totalUnreadCount = computed(() => {
    return conversations.value.reduce((total, conv) => total + conv.unreadCount, 0)
  })

  const getCurrentMessages = computed(() => {
    return currentConversation.value ? messages.value[currentConversation.value.id] || [] : []
  })

  const getCurrentChatUser = computed(() => {
    if (!currentConversation.value || !userStore.user) return null

    const otherParticipant = currentConversation.value.participants.find(
      p => p.id !== userStore.user?.id
    )
    return otherParticipant || null
  })

  const isCurrentUserTyping = computed(() => {
    if (!currentConversation.value) return false

    const convTyping = typingStatus.value[currentConversation.value.id] || {}
    return Object.entries(convTyping).some(
      ([userId, isTyping]) => Number(userId) !== userStore.user?.id && isTyping
    )
  })

  // WebSocket 连接管理
  const initializeWebSocket = () => {
    if (!userStore.user) return

    const token = localStorage.getItem('token')
    if (!token) return

    connectionStatus.value = 'connecting'

    // 设置事件监听
    wsService.on('connected', handleConnected)
    wsService.on('disconnected', handleDisconnected)
    wsService.on('error', handleError)
    wsService.on('message', (data: unknown) => handleNewMessage(data as { message: Message }))
    wsService.on('typing', (data: unknown) => handleTypingStatus(data as { userId: number; conversationId: string; isTyping: boolean }))
    wsService.on('read', (data: unknown) => handleReadStatus(data as { conversationId: string; messageIds: string[]; readBy: number }))
    wsService.on('online_status', (data: unknown) => handleOnlineStatus(data as { userId: number; isOnline: boolean; lastSeen?: string }))
    wsService.on('reconnect_failed', handleReconnectFailed)

    // 连接
    wsService.connect(token)
  }

  const handleConnected = () => {
    isConnected.value = true
    connectionStatus.value = 'connected'
    console.log('聊天 WebSocket 连接成功')
  }

  const handleDisconnected = () => {
    isConnected.value = false
    connectionStatus.value = 'disconnected'
    console.log('聊天 WebSocket 连接断开')
  }

  const handleError = (error: any) => {
    console.error('聊天 WebSocket 错误:', error)
    connectionStatus.value = 'reconnecting'
  }

  const handleReconnectFailed = () => {
    ElMessage.error('聊天连接失败，请刷新页面重试')
    connectionStatus.value = 'disconnected'
  }

  // 消息处理
  const handleNewMessage = (data: { message: Message }) => {
    const { message } = data

    // 添加到消息列表
    if (!messages.value[message.conversationId]) {
      messages.value[message.conversationId] = []
    }
    messages.value[message.conversationId].push(message)

    // 更新会话信息
    updateConversationWithMessage(message)

    // 如果不是当前用户发送的消息，增加未读数
    if (message.senderId !== userStore.user?.id) {
      incrementUnreadCount(message.conversationId)
    }
  }

  const handleTypingStatus = (data: {
    userId: number
    conversationId: string
    isTyping: boolean
  }) => {
    const { userId, conversationId, isTyping } = data

    if (!typingStatus.value[conversationId]) {
      typingStatus.value[conversationId] = {}
    }

    typingStatus.value[conversationId][userId] = isTyping

    // 清除打字状态的定时器
    if (isTyping) {
      setTimeout(() => {
        if (typingStatus.value[conversationId]) {
          typingStatus.value[conversationId][userId] = false
        }
      }, 3000)
    }
  }

  const handleReadStatus = (data: {
    conversationId: string
    messageIds: string[]
    readBy: number
  }) => {
    const { conversationId, messageIds, readBy } = data

    const convMessages = messages.value[conversationId] || []
    convMessages.forEach(msg => {
      if (messageIds.includes(msg.id) && msg.senderId === userStore.user?.id) {
        msg.status = 'read'
      }
    })
  }

  const handleOnlineStatus = (data: { userId: number; isOnline: boolean; lastSeen?: string }) => {
    const { userId, isOnline, lastSeen } = data

    if (isOnline) {
      onlineUsers.value.add(userId)
    } else {
      onlineUsers.value.delete(userId)
    }

    // 更新聊天用户信息
    if (chatUsers.value[userId]) {
      chatUsers.value[userId].isOnline = isOnline
      if (lastSeen) {
        chatUsers.value[userId].lastSeen = lastSeen
      }
    }
  }

  // 发送消息
  const sendTextMessage = async (conversationId: string, content: string) => {
    if (!wsService.isConnected) {
      throw new Error('连接未建立')
    }

    const tempId = `temp_${Date.now()}_${Math.random()}`

    // 创建临时消息（乐观更新）
    const tempMessage: Message = {
      id: tempId,
      conversationId,
      senderId: userStore.user!.id as number,
      receiverId: getCurrentChatUser.value!.id,
      type: 'text',
      content: content.trim(),
      status: 'sending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // 立即添加到消息列表
    if (!messages.value[conversationId]) {
      messages.value[conversationId] = []
    }
    messages.value[conversationId].push(tempMessage)

    // 发送到服务器
    try {
      wsService.sendTextMessage(conversationId, content.trim(), tempId)
    } catch (error) {
      // 发送失败，移除临时消息
      const messageIndex = messages.value[conversationId].findIndex(m => m.id === tempId)
      if (messageIndex !== -1) {
        messages.value[conversationId].splice(messageIndex, 1)
      }
      throw error
    }
  }

  const sendFileMessage = async (conversationId: string, file: File) => {
    if (!wsService.isConnected) {
      throw new Error('连接未建立')
    }

    try {
      // 上传文件
      const uploadResult = file.type.startsWith('image/')
        ? await chatAPI.uploadImage(file)
        : await chatAPI.uploadFile(file)

      const tempId = `temp_${Date.now()}_${Math.random()}`

      // 创建临时消息
      const tempMessage: Message = {
        id: tempId,
        conversationId,
        senderId: userStore.user!.id as number,
        receiverId: getCurrentChatUser.value!.id,
        type: file.type.startsWith('image/') ? 'image' : 'file',
        content: file.type.startsWith('image/') ? uploadResult.fileUrl : uploadResult.fileName,
        fileInfo: {
          name: uploadResult.fileName,
          size: uploadResult.fileSize,
          url: uploadResult.fileUrl,
          mimeType: uploadResult.mimeType,
        },
        status: 'sending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // 添加到消息列表
      if (!messages.value[conversationId]) {
        messages.value[conversationId] = []
      }
      messages.value[conversationId].push(tempMessage)

      // 发送文件消息
      wsService.sendFileMessage(conversationId, {
        ...uploadResult,
        fileType: uploadResult.mimeType
      }, tempId)
    } catch (error) {
      throw error
    }
  }

  const sendTypingStatus = (conversationId: string, isTyping: boolean) => {
    if (wsService.isConnected) {
      wsService.sendTypingStatus(conversationId, isTyping)
    }
  }

  const markMessagesAsRead = async (conversationId: string, messageIds: string[]) => {
    try {
      await chatAPI.markMessagesAsRead(conversationId, messageIds)

      // 发送已读状态
      if (wsService.isConnected) {
        wsService.sendReadStatus(conversationId, messageIds)
      }

      // 减少未读计数
      const conversation = conversations.value.find(c => c.id === conversationId)
      if (conversation) {
        conversation.unreadCount = Math.max(0, conversation.unreadCount - messageIds.length)
      }
    } catch (error) {
      console.error('标记已读失败:', error)
    }
  }

  // 会话管理
  const loadConversations = async () => {
    try {
      const response = await chatAPI.getConversations()
      // 转换API返回的Conversation格式为store期望的格式
      conversations.value = response.conversations.map(conv => ({
        id: conv.id,
        participants: [conv.userA, conv.userB],
        lastMessage: conv.lastMessage,
        unreadCount: conv.unreadCount,
        createdAt: conv.createdAt,
        updatedAt: conv.updatedAt,
      }))
    } catch (error) {
      console.error('加载会话列表失败:', error)
    }
  }

  const loadMessages = async (conversationId: string, loadMore = false) => {
    try {
      const existingMessages = messages.value[conversationId] || []
      const params = {
        conversationId,
        size: 20,
        before: loadMore && existingMessages.length > 0 ? existingMessages[0].createdAt : undefined,
      }

      const response = await chatAPI.getConversationHistory(params)

      if (loadMore) {
        messages.value[conversationId] = [...response.data.messages, ...existingMessages]
      } else {
        messages.value[conversationId] = response.data.messages
      }

      return response.data.hasMore
    } catch (error) {
      console.error('加载消息失败:', error)
      return false
    }
  }

  const loadChatUser = async (userId: number) => {
    try {
      const response = await chatAPI.getChatUser(userId)
      chatUsers.value[userId] = response.data
      return response.data
    } catch (error) {
      console.error('加载用户信息失败:', error)
      return null
    }
  }

  const setCurrentConversation = (conversation: Conversation | null) => {
    currentConversation.value = conversation
  }

  // 辅助方法
  const updateConversationWithMessage = (message: Message) => {
    const convIndex = conversations.value.findIndex(conv => conv.id === message.conversationId)
    if (convIndex !== -1) {
      conversations.value[convIndex].lastMessage = message
      conversations.value[convIndex].updatedAt = message.createdAt
    }
  }

  const incrementUnreadCount = (conversationId: string) => {
    const conversation = conversations.value.find(c => c.id === conversationId)
    if (conversation) {
      conversation.unreadCount += 1
    }
  }

  // 清理
  const cleanup = () => {
    wsService.disconnect()
    // 重置状态
    conversations.value = []
    currentConversation.value = null
    messages.value = {}
    chatUsers.value = {}
    onlineUsers.value.clear()
    typingStatus.value = {}
    isConnected.value = false
    connectionStatus.value = 'disconnected'
  }

  return {
    // 状态
    conversations,
    currentConversation,
    messages,
    chatUsers,
    onlineUsers,
    typingStatus,
    isConnected,
    connectionStatus,

    // 计算属性
    totalUnreadCount,
    getCurrentMessages,
    getCurrentChatUser,
    isCurrentUserTyping,

    // 方法
    initializeWebSocket,
    sendTextMessage,
    sendFileMessage,
    sendTypingStatus,
    markMessagesAsRead,
    loadConversations,
    loadMessages,
    loadChatUser,
    setCurrentConversation,
    cleanup,
  }
})
