export type Comment = {
  id: number
  content: string
  createdAt: string
  userId: number
  publicationId: number
  parentId: number
  likes: number
  isLiked?: boolean
  replies?: Comment[]
  replyToUserName?: string
  replyToUserId?: number
  repliedUserId?: string // 格式: "id,name"
}

export type CreateCommentRequest = {
  content: string
  publicationId: number
  parentId: number
  repliedUser?: string // 格式: "id,姓名"
}
