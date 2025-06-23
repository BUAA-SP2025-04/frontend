import request from '@/utils/request'

export const messagesAPI = {
  // 获取私信会话列表
  getConversations: (params: { page: number; size: number; search?: string; filter?: string }) =>
    request.get('/messages/conversations', { params }),

  // 获取系统通知
  getSystemNotifications: (params: { page: number; size: number; search?: string; filter?: string }) =>
    request.get('/messages/system', { params }),

  // 获取动态提醒
  getActivityNotifications: (params: { page: number; size: number; search?: string; filter?: string }) =>
    request.get('/messages/activity', { params }),

  // 获取在线好友
  getOnlineFriends: () => request.get('/messages/online-friends'),

  // 标记全部已读
  markAllAsRead: (category: string) =>
    request.post(`/messages/${category}/mark-all-read`),

  // 标记单条已读
  markAsRead: (category: string, id: number) =>
    request.post(`/messages/${category}/${id}/read`),
}