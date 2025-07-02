export interface Notification {
  id: number
  content: string
  name: string
  createdAt: string
  isRead: boolean
  type: 'publish_paper' | 'start_project' | 'join_conference' | 'follow' | 'like' | 'comment' | 'activity' | 'question_answer'
  userId: number
  publicationId: number
  avatarUrl: string
  senderId: number
}

export interface WebSocketNotification {
  avatarUrl: string
  name: string
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
