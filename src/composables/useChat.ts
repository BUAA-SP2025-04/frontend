import { computed } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useUserStore } from '@/stores/user'

export function useChat(conversationId?: string) {
  const chatStore = useChatStore()
  const userStore = useUserStore()

  // 基于会话ID的计算属性
  const messages = computed(() => {
    return conversationId ? chatStore.messages[conversationId] || [] : []
  })

  const currentConversation = computed(() => {
    return conversationId
      ? chatStore.conversations.find(c => c.id === conversationId) || null
      : null
  })

  // 简化的方法，直接调用 store 中的方法
  const sendTextMessage = (content: string) => {
    if (!conversationId) throw new Error('会话ID不能为空')
    return chatStore.sendTextMessage(conversationId, content)
  }

  const sendFileMessage = (file: File) => {
    if (!conversationId) throw new Error('会话ID不能为空')
    return chatStore.sendFileMessage(conversationId, file)
  }

  const sendTypingStatus = (isTyping: boolean) => {
    if (!conversationId) return
    chatStore.sendTypingStatus(conversationId, isTyping)
  }

  const loadMessages = (loadMore = false) => {
    if (!conversationId) return Promise.resolve(false)
    return chatStore.loadMessages(conversationId, loadMore)
  }

  const markAsRead = (messageIds?: string[]) => {
    if (!conversationId) return

    const unreadMessages = messages.value
      .filter(m => m.senderId !== userStore.user?.id && m.status !== 'read')
      .map(m => m.id)

    if (messageIds) {
      chatStore.markMessagesAsRead(conversationId, messageIds)
    } else if (unreadMessages.length > 0) {
      chatStore.markMessagesAsRead(conversationId, unreadMessages)
    }
  }

  return {
    // 数据
    messages,
    currentConversation,
    chatUser: chatStore.getCurrentChatUser,
    isLoading: computed(() => false), // 可以添加具体的加载状态
    hasMore: computed(() => true), // 可以添加具体的分页状态
    isTyping: chatStore.isCurrentUserTyping,
    onlineUsers: chatStore.onlineUsers,
    isConnected: chatStore.isConnected,

    // 方法
    sendTextMessage,
    sendFileMessage,
    sendTypingStatus,
    loadMessages,
    loadChatUser: chatStore.loadChatUser,
    markAsRead,
    cleanup: chatStore.cleanup,
  }
}
