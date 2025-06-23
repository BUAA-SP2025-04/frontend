export interface Notification {
  id: number
  userId: number
  type: 'system' | 'message' | 'comment' | 'collaboration'
  content: string
  isRead: boolean
  createdAt: string
}

export interface WebSocketMessage {
  type: 'notification' | 'connection' | 'error'
  data: unknown
}
