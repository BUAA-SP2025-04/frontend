import request from '@/utils/request'
import type {
  GetPostsParams,
  GetPostsResponse,
  CreatePostParams,
  GetCommentsResponse,
  CreateCommentParams,
  Post,
  Comment,
  User,
} from '@/api/types/social'

export const socialAPI = {
  // 获取当前用户信息
  getCurrentUser: (): Promise<User> => {
    return request.get('/user/profile')
  },

  // 获取动态列表
  getPosts: (params: GetPostsParams): Promise<GetPostsResponse> => {
    return request.get('/posts', { params })
  },

  // 获取动态详情
  getPost: (id: number): Promise<Post> => {
    return request.get(`/posts/${id}`)
  },

  // 发布动态
  createPost: (data: CreatePostParams): Promise<{ id: number }> => {
    return request.post('/posts', data)
  },

  // 点赞/取消点赞动态
  toggleLike: (id: number): Promise<{ isLiked: boolean; likesCount: number }> => {
    return request.post(`/posts/${id}/like`)
  },

  // 分享动态
  sharePost: (id: number): Promise<{ sharesCount: number }> => {
    return request.post(`/posts/${id}/share`)
  },

  // 获取评论列表
  getComments: (
    postId: number,
    params: { page: number; size: number }
  ): Promise<GetCommentsResponse> => {
    return request.get(`/posts/${postId}/comments`, { params })
  },

  // 发表评论
  createComment: (postId: number, data: CreateCommentParams): Promise<{ id: number }> => {
    return request.post(`/posts/${postId}/comments`, data)
  },

  // 点赞/取消点赞评论
  toggleCommentLike: (commentId: number): Promise<{ isLiked: boolean; likesCount: number }> => {
    return request.post(`/comments/${commentId}/like`)
  },

  // 保存动态
  savePost: (id: number): Promise<void> => {
    return request.post(`/posts/${id}/save`)
  },

  // 举报动态
  reportPost: (id: number, reason: string): Promise<void> => {
    return request.post(`/posts/${id}/report`, { reason })
  },
}
