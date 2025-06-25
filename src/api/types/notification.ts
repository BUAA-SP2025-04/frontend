export interface Notification {
  id: number
  content: string
  createdAt: string
  isRead: boolean
  type: 'message' | 'comment' | 'collaboration' | 'system'
  userId: number
  publicationId: number
  avatarUrl: string
}

export interface WebSocketMessage {
  type: string
  data: unknown
}
