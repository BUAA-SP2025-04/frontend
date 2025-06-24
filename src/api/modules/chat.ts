import request from '@/utils/request'
import type {
  GetConversationHistoryRequest,
  GetConversationHistoryResponse,
  CreateConversationRequest,
  CreateConversationResponse,
  UploadFileResponse,
  ChatUser,
  Conversation
} from '@/api/types/chat'

export const chatAPI = {
  // 获取用户的所有会话
  getConversations: (): Promise<{ conversations: Conversation[] }> =>
    request.get('/chat/conversations'),

  // 创建新会话
  createConversation: (data: CreateConversationRequest): Promise<CreateConversationResponse> =>
    request.post('/chat/conversations', data),

  // 获取会话历史消息
  getConversationHistory: (params: GetConversationHistoryRequest): Promise<GetConversationHistoryResponse> =>
    request.get(`/chat/conversations/${params.conversationId}/messages`, { 
      params: { 
        page: params.page, 
        size: params.size, 
        before: params.before 
      } 
    }),

  // 获取聊天用户信息
  getChatUser: (userId: number): Promise<{ user: ChatUser }> =>
    request.get(`/users/${userId}/chat-info`),

  // 上传文件
  uploadFile: (file: File): Promise<UploadFileResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    return request.post('/chat/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  // 上传图片
  uploadImage: (file: File): Promise<UploadFileResponse> => {
    const formData = new FormData()
    formData.append('image', file)
    return request.post('/chat/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  // 标记消息已读
  markMessagesAsRead: (conversationId: string, messageIds: string[]) =>
    request.post(`/chat/conversations/${conversationId}/read`, { messageIds }),

  // 删除会话
  deleteConversation: (conversationId: string) =>
    request.delete(`/chat/conversations/${conversationId}`),

  // 清空聊天记录
  clearConversation: (conversationId: string) =>
    request.delete(`/chat/conversations/${conversationId}/messages`)
}