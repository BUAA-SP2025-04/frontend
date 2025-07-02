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
export interface ConversationRaw {
  userId: number
  conversationId: string
  name: string
  avatar: string | null
  institution: string
  online: boolean
  read: boolean
  unreadCount: number
  lastMessage: {
    content: string
    isMe: boolean
    type: string
  } | null
  lastMessageTime: string
}

// 前端使用的会话数据（转换后）
export interface Conversation {
  id: number
  userId: number
  conversationId: string
  name: string
  avatar: string
  institution: string
  online: boolean
  isRead: boolean
  unreadCount: number
  lastMessage: {
    content: string
    type?: string
    isMe?: boolean
  }
  lastMessageTime: string
}

export interface GetConversationsResponse extends ApiResponse<{ 
  list: Conversation[]    // 后端返回原始数据
}> {}

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
  type: 'publish_paper' | 'start_project' | 'join_conference' | 'follow' | 'like' | 'comment' | 'activity'  | 'join_project'       | 'accept_application'  | "answer" | "like_answer"
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
  content?: string | {
    title: string
    description: string
    paperTitle?: string
  }
}

// 后端原始消息设置结构
export interface MessageSettingsRaw {
  activity: boolean
  conversation: boolean
  system: boolean
  email: boolean
  stranger: boolean
  online: boolean
  uid?: number
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


export interface GetSystemNotificationsResponse extends ApiResponse<SystemNotification[] | { list: SystemNotification[]; unreadCount: number }> {}

export interface GetActivityNotificationsResponse extends ApiResponse<ActivityNotification[] | { list: ActivityNotification[]; unreadCount: number }> {}

// 获取消息设置响应
export interface GetMessageSettingsResponse extends ApiResponse<MessageSettingsRaw> {}

export interface MarkAsReadResponse extends ApiResponse<{ success: boolean }> {}

export interface SaveSettingsResponse extends ApiResponse<{ success: boolean }> {}

// 导出联合类型，方便使用
export type FriendsData = Friend[] | Friend | { list: Friend[] }
export type ConversationsData = Conversation[] | { list: Conversation[]; unreadCount: number }
export type SystemNotificationsData = SystemNotification[] | { list: SystemNotification[]; unreadCount: number }
export type ActivityNotificationsData = ActivityNotification[] | { list: ActivityNotification[]; unreadCount: number }