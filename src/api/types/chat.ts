export interface ApiResponse<T> {
  code: string
  message: string
  data: T
}

// 聊天相关类型定义
export interface ChatUser {
  id: number
  name: string
  avatar: string
  institution: string
  isOnline: boolean
  lastSeen: string
}

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
  userA: ChatUser
  userB: ChatUser
  lastMessage?: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
}

// 请求和响应类型
export interface GetConversationHistoryRequest {
  conversationId: string
  before?: string | null // 时间戳，用于分页
}

export interface GetConversationHistoryResponse {
  messages: Message[]
  hasMore: boolean
  nextCursor?: string
}

export interface CreateConversationRequest {
  participantId: number
}

export interface CreateConversationResponse {
  conversation: Conversation
}

export interface UploadFileResponse {
  fileId: string
  fileName: string
  fileSize: number
  fileUrl: string
  mimeType: string
}

// WebSocket 消息类型
export interface WSMessage {
  type: 'message' | 'typing' | 'read' | 'online_status' | 'error'
  data: any
  timestamp: string
}

export interface WSTextMessage {
  type: 'message'
  data: {
    message: Message
  }
}

export interface WSTypingMessage {
  type: 'typing'
  data: {
    userId: number
    conversationId: string
    isTyping: boolean
  }
}

export interface WSReadMessage {
  type: 'read'
  data: {
    conversationId: string
    messageIds: string[]
    readBy: number
  }
}

export interface WSOnlineStatusMessage {
  type: 'online_status'
  data: {
    userId: number
    isOnline: boolean
    lastSeen?: string
  }
}

export interface WSFileMessage {
  type: 'message'
  data: {
    message: Message & {
      fileInfo?: {
        name: string
        size: number
        url: string
        mimeType: string
      }
    }
  }
}

// 统一的 WebSocket 消息格式
export type WSMessageType = WSTextMessage | WSFileMessage | WSTypingMessage | WSReadMessage | WSOnlineStatusMessage

// WebSocket 发送消息格式
export interface WSSendMessage {
  type: 'send_message' | 'typing' | 'read' | 'ping'
  data: {
    conversationId: string
    content?: string
    type?: 'text' | 'image' | 'file'
    fileInfo?: {
      name: string
      size: number
      url: string
      mimeType: string
    }
    tempId?: string
    isTyping?: boolean
    messageIds?: string[]
  }
  timestamp: string
}