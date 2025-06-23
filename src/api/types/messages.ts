// 好友（互关）类型
export interface Friend {
  id: number
  name: string
  avatar: string
  status: '在线' | '离线'
}

// 私信会话
export interface Conversation {
  id: number
  userId: number
  name: string
  avatar: string
  institution: string
  isOnline: boolean
  isRead: boolean
  unreadCount: number
  lastMessage: {
    content: string
    isMe: boolean
    type: 'text' | 'file'
  }
  lastMessageTime: string
}

// 系统通知
export interface SystemNotification {
  id: number
  type: 'security' | 'update'
  title: string
  content: string
  isRead: boolean
  createdAt: string
  action?: {
    text: string
    url: string
  }
}

// 动态提醒
export interface ActivityNotification {
  id: number
  type: 'publish_paper' | 'start_project' | 'join_conference'
  isRead: boolean
  createdAt: string
  user: {
    id: number
    name: string
    avatar: string
    institution: string
  }
  content: {
    title: string
    description: string
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

// 响应类型
export interface GetFriendsResponse {
  list: Friend[]
}
export interface GetConversationsResponse {
  list: Conversation[]
  unreadCount: number
}
export interface GetSystemNotificationsResponse {
  list: SystemNotification[]
  unreadCount: number
}
export interface GetActivityNotificationsResponse {
  list: ActivityNotification[]
  unreadCount: number
}
export interface GetMessageSettingsResponse {
  settings: MessageSettings
}