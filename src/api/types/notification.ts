export interface Notification {
  id: number
  content: string
  createdAt: string
  isRead: boolean
  type: 'comment' | 'activity' | 'system'
  userId: number
  publicationId: number
  avatarUrl: string
  senderId: number
}

export interface WebSocketNotification {
  avatarUrl: string
  notification: {
    id: number
    userId: number
    content: string
    type: 'comment' | 'activity' | 'system'
    createdAt: string
    isRead: boolean
    senderId: number
  }
  publicationId: number
}
