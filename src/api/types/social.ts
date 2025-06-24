// 用户类型
export interface User {
  id: number
  name: string
  avatar: string
  institution?: string
  bio?: string
  followersCount?: number
  followingCount?: number
  postsCount?: number
}

// 动态类型
export type PostType = 'paper' | 'project' | 'conference' | 'opinion' | 'collaboration'

// 附件类型
export interface PaperAttachment {
  type: 'paper'
  title: string
  journal: string
  year: number
  abstract: string
  citations: number
  downloads: number
  url: string
}

export interface ImageAttachment {
  type: 'image'
  name: string
  url: string
  size?: number
}

export interface LinkAttachment {
  type: 'link'
  title: string
  description: string
  url: string
}

export type Attachment = PaperAttachment | ImageAttachment | LinkAttachment

// 评论类型
export interface Comment {
  id: number
  content: string
  author: User
  createdAt: string
  likesCount: number
  isLiked: boolean
  parentId?: number
  replies?: Comment[]
}

// 动态类型
export interface Post {
  id: number
  type: PostType
  title?: string
  content: string
  author: User
  attachments?: Attachment[]
  tags?: string[]
  createdAt: string
  updatedAt: string
  likesCount: number
  commentsCount: number
  sharesCount: number
  viewsCount: number
  isLiked: boolean
  // 前端状态
  showComments?: boolean
  showFullContent?: boolean
  newComment?: string
  comments?: Comment[]
}

// API 参数类型
export interface GetPostsParams {
  page: number
  size: number
  category?: string
  sortBy?: 'latest' | 'hot' | 'comments'
  search?: string
  tags?: string[]
}

export interface CreatePostParams {
  type: PostType
  title?: string
  content: string
  attachments?: Attachment[]
  tags?: string[]
}

export interface CreateCommentParams {
  content: string
  parentId?: number
}

// API 响应类型
export interface PaginationResponse<T> {
  list: T[]
  total: number
  page: number
  size: number
  hasMore: boolean
}

export type GetPostsResponse = PaginationResponse<Post>
export type GetCommentsResponse = PaginationResponse<Comment>
