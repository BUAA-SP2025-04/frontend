// 好友（互关）类型
export interface Friend {
  id: number
  name: string
  avatar: string
  status: '在线' | '离线'
  isOnline?: boolean
  institution?: string
}

// 私信会话
export interface Conversation {
  id: number // 可以用 userId 赋值
  userId: number
  name: string
  avatar: string
  institution: string
  isOnline: boolean
  unreadCount: number
  lastMessage: {
    id: number
    senderId: number
    receiverId: number
    content: string
    createdAt: string
    isRead: boolean
  }
  lastMessageTime?: string
  isRead?: boolean
}

// 系统通知
export interface SystemNotification {
  id: number
  type: 'security' | 'update' | 'system'
  title: string
  content: string
  isRead: boolean
  createdAt: string
  userId?: number
  action?: {
    text: string
    url: string
  } | null
}

// 动态提醒（兼容后端多种结构）
export interface ActivityNotification {
  id: number
  type:
    | 'publish_paper'
    | 'start_project'
    | 'join_conference'
    | 'follow'
    | 'like'
    | 'comment'
    | 'activity'
  isRead: boolean
  createdAt: string
  userId?: number
  senderId?: number
  publicationId?: number
  avatarUrl?: string
  name?: string
  // 兼容后端返回的 notification 嵌套结构
  notification?: {
    id: number
    userId: number
    senderId?: number
    type: string
    avatarUrl: string
    content: string
    isRead: boolean
    createdAt: string
  }
  // 前端解析后结构
  user: {
    id: number
    name: string
    avatar: string
    institution: string
  }
  content?:
    | string
    | {
        title: string
        description: string
        paperTitle?: string
      }
}

// 消息设置
export interface MessageSettings {
  newMessage: boolean
  followActivity: boolean
  systemNotice: boolean
  emailNotification: boolean
  allowStrangerMessage: boolean
  showOnlineStatus: boolean
}

// 基础 API 响应结构
export interface ApiResponse<T = any> {
  code: string | number
  message: string
  data: T
}

// API 响应类型 - 包含完整响应结构
export interface GetFriendsResponse extends ApiResponse<Friend[] | Friend | { list: Friend[] }> {}

export interface GetConversationsResponse
  extends ApiResponse<Conversation[] | { list: Conversation[]; unreadCount: number }> {}

export interface GetSystemNotificationsResponse
  extends ApiResponse<SystemNotification[] | { list: SystemNotification[]; unreadCount: number }> {}

export interface GetActivityNotificationsResponse
  extends ApiResponse<
    ActivityNotification[] | { list: ActivityNotification[]; unreadCount: number }
  > {}

export interface GetMessageSettingsResponse extends ApiResponse<{ settings: MessageSettings }> {}

export interface MarkAsReadResponse extends ApiResponse<{ success: boolean }> {}

export interface SaveSettingsResponse extends ApiResponse<{ success: boolean }> {}

// 导出联合类型，方便使用
export type FriendsData = Friend[] | Friend | { list: Friend[] }
export type ConversationsData = Conversation[] | { list: Conversation[]; unreadCount: number }
export type SystemNotificationsData =
  | SystemNotification[]
  | { list: SystemNotification[]; unreadCount: number }
export type ActivityNotificationsData =
  | ActivityNotification[]
  | { list: ActivityNotification[]; unreadCount: number }
