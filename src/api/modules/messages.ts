import request from '@/utils/request'
import type {
  GetFriendsResponse,
  GetConversationsResponse,
  GetSystemNotificationsResponse,
  GetActivityNotificationsResponse,
  GetMessageSettingsResponse,
  MessageSettings
} from '@/api/types/messages'

export const messagesAPI = {
  // 获取在线好友（互关）
  getFriends: (): Promise<GetFriendsResponse> =>
    request.get('/messages/friends'),

  // 获取全部私信会话
  getConversations: (): Promise<GetConversationsResponse> =>
    request.get('/messages/conversations'),

  // 获取全部系统通知
  getSystemNotifications: (): Promise<GetSystemNotificationsResponse> =>
    request.get('/messages/system'),

  // 获取全部动态提醒
  getActivityNotifications: (): Promise<GetActivityNotificationsResponse> =>
    request.get('/messages/activity'),

  // 标记全部已读
  markAllAsRead: (category: string) =>
    request.post(`/messages/${category}/mark-all-read`),

  // 标记单条已读
  markAsRead: (category: string, id: number) =>
    request.post(`/messages/${category}/${id}/read`),

  // 获取消息设置
  getMessageSettings: (): Promise<GetMessageSettingsResponse> =>
    request.get('/user/message-settings'),

  // 保存消息设置
  saveMessageSettings: (settings: MessageSettings) =>
    request.post('/user/message-settings', settings)
}