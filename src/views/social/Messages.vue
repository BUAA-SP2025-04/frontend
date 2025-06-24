<!-- filepath: c:\Users\Windows11\Desktop\小学期\frontend\src\views\social\Messages.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 flex items-center">
            <svg class="w-8 h-8 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            消息中心
          </h1>
          <p class="text-gray-600 mt-2">管理您的私信、系统通知和动态提醒</p>
        </div>
        <el-button @click="openSettingsDialog">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          消息设置
        </el-button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- 左侧消息分类 -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-6 sticky top-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">消息分类</h3>
            <nav class="space-y-2">
              <button v-for="category in messageCategories" :key="category.id"
                :class="[
                  'w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors',
                  activeCategory === category.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100',
                ]" @click="setActiveCategory(category.id)">
                <div class="flex items-center">
                  <component :is="category.icon" class="w-5 h-5 mr-3" />
                  <span class="font-medium">{{ category.name }}</span>
                </div>
                <span v-if="category.unreadCount > 0"
                  class="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {{ category.unreadCount > 99 ? '99+' : category.unreadCount }}
                </span>
              </button>
            </nav>
            <!-- 全部好友 -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <h4 class="text-sm font-medium text-gray-900 mb-3">好友列表</h4>
              <div class="space-y-2">
                <div v-for="friend in allFriends" :key="friend.id"
                  class="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  @click="startChat(friend.id)">
                  <div class="relative">
                    <img :src="friend.avatar" :alt="friend.name" class="w-8 h-8 rounded-full object-cover" />
                    <div v-if="friend.status === '在线'"
                      class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    <div v-else
                      class="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div class="ml-3 flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ friend.name }}</p>
                    <p :class="['text-xs truncate', friend.status === '在线' ? 'text-green-600' : 'text-gray-500']">{{ friend.status }}</p>
                  </div>
                </div>
              </div>
              <div v-if="allFriends.length === 0" class="text-center py-4 text-gray-500 text-sm">
                暂无好友
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧消息列表 -->
        <div class="lg:col-span-3">
          <!-- 搜索栏 -->
          <div class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <el-input v-model="searchQuery" placeholder="搜索消息内容、发送者..." prefix-icon="Search" size="large" />
              </div>
              <el-select v-model="messageFilter" placeholder="消息类型" size="large" style="width: 150px">
                <el-option label="全部" value="all" />
                <el-option label="未读" value="unread" />
                <el-option label="已读" value="read" />
              </el-select>
              <el-button @click="markAllAsRead" :disabled="!hasUnreadMessages">全部标记为已读</el-button>
            </div>
          </div>

          <!-- 消息列表 -->
          <div class="bg-white rounded-lg shadow">
            <!-- 私信列表 -->
            <div v-if="activeCategory === 'chat'" class="divide-y divide-gray-200">
              <div v-for="conversation in filteredConversations" :key="conversation.id"
                :class="[
                  'p-6 hover:bg-gray-50 cursor-pointer transition-colors relative',
                  !conversation.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : '',
                ]" @click="openChat(conversation.userId)">
                <!-- 未读标记小图标 -->
                <button v-if="!conversation.isRead"
                  @click.stop="markAsReadLocal('conversations', conversation.id)"
                  class="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
                  title="标记为已读">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </button>
                
                <div class="flex items-start space-x-4 pr-8">
                  <div class="relative flex-shrink-0">
                    <img :src="conversation.avatar" :alt="conversation.name"
                      class="w-12 h-12 rounded-full object-cover" />
                    <div v-if="conversation.isOnline"
                      class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="text-sm font-medium text-gray-900">{{ conversation.name }}</h3>
                      <div class="flex items-center space-x-2">
                        <span class="text-xs text-gray-500">{{ formatTime(conversation.lastMessageTime) }}</span>
                      </div>
                    </div>
                    <p class="text-sm text-gray-600 mt-1 line-clamp-2">
                      <span v-if="conversation.lastMessage.isMe" class="text-gray-400">我：</span>
                      {{ conversation.lastMessage.content }}
                    </p>
                    <div class="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                      <span>{{ conversation.institution }}</span>
                      <span v-if="conversation.lastMessage.type === 'file'" class="flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                          <path fill-rule="evenodd"
                            d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                            clip-rule="evenodd" />
                        </svg>
                        文件
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 系统通知列表 -->
            <div v-else-if="activeCategory === 'system'" class="divide-y divide-gray-200">
              <div v-for="notification in filteredSystemNotifications" :key="notification.id"
                :class="[
                  'p-6 hover:bg-gray-50 transition-colors relative',
                  !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : '',
                ]">
                <!-- 未读标记小图标 -->
                <button v-if="!notification.isRead"
                  @click.stop="markAsReadLocal('system', notification.id)"
                  class="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
                  title="标记为已读">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </button>

                <div class="flex items-start space-x-4 pr-8">
                  <div :class="[
                    'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm',
                    getNotificationIconColor(notification.type),
                  ]">
                    <component :is="getNotificationIcon(notification.type)" class="w-6 h-6" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between mb-2">
                      <div class="flex-1 mr-4">
                        <h3 class="text-base font-semibold text-gray-900 mb-1">{{ notification.title }}</h3>
                        <span :class="[
                          'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                          getNotificationTypeColor(notification.type),
                        ]">
                          {{ getNotificationTypeLabel(notification.type) }}
                        </span>
                      </div>
                      <span class="text-xs text-gray-500 whitespace-nowrap">{{ formatTime(notification.createdAt) }}</span>
                    </div>
                    <p class="text-sm text-gray-600 leading-relaxed mb-3">{{ notification.content }}</p>
                    <div v-if="notification.action" class="flex items-center space-x-3">

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 动态提醒列表 -->
            <div v-else-if="activeCategory === 'activity'" class="divide-y divide-gray-200">
              <div v-for="activity in filteredActivityNotifications" :key="activity.id"
                :class="[
                  'p-6 hover:bg-gray-50 cursor-pointer transition-colors relative',
                  !activity.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : '',
                ]" @click="handleActivityClick(activity)">
                <!-- 未读标记小图标 -->
                <button v-if="!activity.isRead"
                  @click.stop="markAsReadLocal('activity', activity.id)"
                  class="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
                  title="标记为已读">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </button>

                <div class="flex items-start space-x-4 pr-8">
                  <img :src="activity.user.avatar" :alt="activity.user.name"
                    class="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-2">
                      <p class="text-sm text-gray-900">
                        <span class="font-medium">{{ activity.user.name }}</span>
                        {{ getActivityText(activity.type) }}
                        <span class="font-medium">{{ activity.content.title }}</span>
                      </p>
                      <span class="text-xs text-gray-500 whitespace-nowrap">{{ formatTime(activity.createdAt) }}</span>
                    </div>
                    <p class="text-sm text-gray-600 mt-1 line-clamp-2">{{ activity.content.description }}</p>
                    <div class="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                      <span class="flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ getActivityLabel(activity.type) }}
                      </span>
                      <span>{{ activity.user.institution }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 空状态 -->
            <div v-if="filteredMessages.length === 0" class="p-12 text-center">
              <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-2">暂无消息</h3>
              <p class="text-gray-500">{{ getEmptyStateText() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 消息设置对话框 -->
      <el-dialog v-model="showSettingsDialog" title="消息设置" width="50%">
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">通知设置</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">新私信通知</h4>
                  <p class="text-sm text-gray-500">收到新私信时显示通知</p>
                </div>
                <el-switch v-model="messageSettings.newMessage" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">关注动态提醒</h4>
                  <p class="text-sm text-gray-500">关注的人发布新动态时通知</p>
                </div>
                <el-switch v-model="messageSettings.followActivity" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">系统通知</h4>
                  <p class="text-sm text-gray-500">接收系统重要通知</p>
                </div>
                <el-switch v-model="messageSettings.systemNotice" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">邮件通知</h4>
                  <p class="text-sm text-gray-500">通过邮件接收重要消息</p>
                </div>
                <el-switch v-model="messageSettings.emailNotification" />
              </div>
            </div>
          </div>
          <div class="border-t pt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">隐私设置</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">允许陌生人发送私信</h4>
                  <p class="text-sm text-gray-500">未关注的用户也可以向您发送私信</p>
                </div>
                <el-switch v-model="messageSettings.allowStrangerMessage" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">显示在线状态</h4>
                  <p class="text-sm text-gray-500">让其他用户看到您的在线状态</p>
                </div>
                <el-switch v-model="messageSettings.showOnlineStatus" />
              </div>
            </div>
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="showSettingsDialog = false">取消</el-button>
            <el-button type="primary" @click="saveSettings">保存设置</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, h, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { messagesAPI } from '@/api/modules/messages'
import type { 
  Conversation, 
  SystemNotification, 
  ActivityNotification, 
  Friend,
  MessageSettings 
} from '@/api/types/messages'

const router = useRouter()

// 图标组件
const ChatIcon = () =>
  h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    }),
  ])
const BellIcon = () =>
  h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M15 17h5l-5 5v-5z',
    }),
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M4 5h12a2 2 0 012 2v8.586l-3-3H4a2 2 0 01-2-2V7a2 2 0 012-2z',
    }),
  ])
const ActivityIcon = () =>
  h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M13 10V3L4 14h7v7l9-11h-7z',
    }),
  ])

// 响应式数据
const activeCategory = ref('chat')
const searchQuery = ref('')
const messageFilter = ref('all')
const showSettingsDialog = ref(false)

// 数据
const conversations = ref<Conversation[]>([])
const systemNotifications = ref<SystemNotification[]>([])
const activityNotifications = ref<ActivityNotification[]>([])
const allFriends = ref<Friend[]>([])

// 消息分类
const messageCategories = ref([
  { id: 'chat', name: '私信', icon: ChatIcon, unreadCount: 0 },
  { id: 'system', name: '系统通知', icon: BellIcon, unreadCount: 0 },
  { id: 'activity', name: '动态提醒', icon: ActivityIcon, unreadCount: 0 },
])

// 设置
const messageSettings = reactive<MessageSettings>({
  newMessage: true,
  followActivity: true,
  systemNotice: true,
  emailNotification: false,
  allowStrangerMessage: true,
  showOnlineStatus: true,
})

// 计算属性
const filteredConversations = computed(() => {
  let filtered = conversations.value

  // 根据设置决定是否显示私信
  if (!messageSettings.newMessage) {
    filtered = []
  }

  // 搜索过滤
  if (searchQuery.value.trim()) {
    filtered = filtered.filter(conv => 
      conv.name.includes(searchQuery.value) || 
      conv.lastMessage.content.includes(searchQuery.value)
    )
  }

  // 状态过滤
  if (messageFilter.value === 'unread') {
    filtered = filtered.filter(conv => !conv.isRead)
  } else if (messageFilter.value === 'read') {
    filtered = filtered.filter(conv => conv.isRead)
  }

  return filtered
})

const filteredSystemNotifications = computed(() => {
  let filtered = systemNotifications.value

  // 根据设置决定是否显示系统通知
  if (!messageSettings.systemNotice) {
    filtered = []
  }

  // 搜索过滤
  if (searchQuery.value.trim()) {
    filtered = filtered.filter(notif => 
      notif.title.includes(searchQuery.value) || 
      notif.content.includes(searchQuery.value)
    )
  }

  // 状态过滤
  if (messageFilter.value === 'unread') {
    filtered = filtered.filter(notif => !notif.isRead)
  } else if (messageFilter.value === 'read') {
    filtered = filtered.filter(notif => notif.isRead)
  }

  return filtered
})

const filteredActivityNotifications = computed(() => {
  let filtered = activityNotifications.value

  // 根据设置决定是否显示动态提醒
  if (!messageSettings.followActivity) {
    filtered = []
  }

  // 搜索过滤
  if (searchQuery.value.trim()) {
    filtered = filtered.filter(activity => 
      activity.user.name.includes(searchQuery.value) || 
      activity.content.title.includes(searchQuery.value) ||
      activity.content.description.includes(searchQuery.value)
    )
  }

  // 状态过滤
  if (messageFilter.value === 'unread') {
    filtered = filtered.filter(activity => !activity.isRead)
  } else if (messageFilter.value === 'read') {
    filtered = filtered.filter(activity => activity.isRead)
  }

  return filtered
})

const filteredMessages = computed(() => {
  switch (activeCategory.value) {
    case 'chat':
      return filteredConversations.value
    case 'system':
      return filteredSystemNotifications.value
    case 'activity':
      return filteredActivityNotifications.value
    default:
      return []
  }
})

const hasUnreadMessages = computed(() => {
  return messageCategories.value.some(cat => cat.unreadCount > 0)
})

// 方法
const setActiveCategory = (categoryId: string) => {
  activeCategory.value = categoryId
  // 切换分类时立即加载对应数据
  loadCurrentCategory()
}

const startChat = (userId: number) => {
  router.push(`/chat/${userId}`)
}

const openChat = (userId: number) => {
  router.push(`/chat/${userId}`)
}

// 前端直接标记全部已读，减少后端请求
const markAllAsRead = async () => {
  try {
    // 统一传参格式
    let apiCategory = activeCategory.value
    if (activeCategory.value === 'chat') {
      apiCategory = 'conversations'
    }
    
    await messagesAPI.markAllAsRead(apiCategory)
    ElMessage.success('已全部标记为已读')
    
    // 前端直接更新状态，避免重新请求
    updateAllAsRead()
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

// 前端直接标记单条已读，减少后端请求
const markAsReadLocal = async (category: string, id: number) => {
  try {
    // 统一传参格式
    let apiCategory = category
    if (category === 'chat') {
      apiCategory = 'conversations'
    }
    
    await messagesAPI.markAsRead(apiCategory, id)
    ElMessage.success('已标记为已读')
    
    // 前端直接更新状态，避免重新请求
    updateSingleAsRead(category, id)
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

// 前端更新全部已读状态
const updateAllAsRead = () => {
  if (activeCategory.value === 'chat') {
    conversations.value = conversations.value.map(conv => ({ ...conv, isRead: true, unreadCount: 0 }))
    messageCategories.value[0].unreadCount = 0
  } else if (activeCategory.value === 'system') {
    systemNotifications.value = systemNotifications.value.map(notif => ({ ...notif, isRead: true }))
    messageCategories.value[1].unreadCount = 0
  } else if (activeCategory.value === 'activity') {
    activityNotifications.value = activityNotifications.value.map(activity => ({ ...activity, isRead: true }))
    messageCategories.value[2].unreadCount = 0
  }
}

// 前端更新单条已读状态
const updateSingleAsRead = (category: string, id: number) => {
  if (category === 'chat' || category === 'conversations') {
    const convIndex = conversations.value.findIndex(conv => conv.id === id)
    if (convIndex !== -1) {
      conversations.value[convIndex].isRead = true
      conversations.value[convIndex].unreadCount = 0
      messageCategories.value[0].unreadCount = Math.max(0, messageCategories.value[0].unreadCount - 1)
    }
  } else if (category === 'system') {
    const notifIndex = systemNotifications.value.findIndex(notif => notif.id === id)
    if (notifIndex !== -1) {
      systemNotifications.value[notifIndex].isRead = true
      messageCategories.value[1].unreadCount = Math.max(0, messageCategories.value[1].unreadCount - 1)
    }
  } else if (category === 'activity') {
    const activityIndex = activityNotifications.value.findIndex(activity => activity.id === id)
    if (activityIndex !== -1) {
      activityNotifications.value[activityIndex].isRead = true
      messageCategories.value[2].unreadCount = Math.max(0, messageCategories.value[2].unreadCount - 1)
    }
  }
}

const handleNotificationAction = (notification: SystemNotification) => {
  if (notification.action?.url) {
    router.push(notification.action.url)
  }
}

const handleActivityClick = (activity: ActivityNotification) => {
  if (!activity.isRead) {
    markAsReadLocal('activity', activity.id)
  }
  router.push(`/user/${activity.user.id}`)
}

const getNotificationIcon = (type: string) => {
  const icons: Record<string, () => ReturnType<typeof h>> = {
    security: () =>
      h('svg', { class: 'w-6 h-6', fill: 'currentColor', viewBox: '0 0 20 20' }, [
        h('path', {
          'fill-rule': 'evenodd',
          d: 'M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z',
          'clip-rule': 'evenodd',
        }),
      ]),
    update: () =>
      h('svg', { class: 'w-6 h-6', fill: 'currentColor', viewBox: '0 0 20 20' }, [
        h('path', {
          'fill-rule': 'evenodd',
          d: 'M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z',
          'clip-rule': 'evenodd',
        }),
      ]),
  }
  return icons[type] || icons.update
}

const getNotificationIconColor = (type: string) => {
  const colors: Record<string, string> = {
    security: 'bg-red-100 text-red-600 border border-red-200',
    update: 'bg-blue-100 text-blue-600 border border-blue-200',
  }
  return colors[type] || 'bg-gray-100 text-gray-600 border border-gray-200'
}

const getNotificationTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    security: 'bg-red-100 text-red-700',
    update: 'bg-blue-100 text-blue-700',
  }
  return colors[type] || 'bg-gray-100 text-gray-700'
}

const getNotificationTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    security: '安全提醒',
    update: '系统更新',
  }
  return labels[type] || '系统通知'
}

const getActivityText = (type: string) => {
  const texts = {
    publish_paper: '发表了新论文',
    start_project: '启动了新项目',
    join_conference: '参加了会议',
  }
  return texts[type as keyof typeof texts] || '有新动态'
}

const getActivityLabel = (type: string) => {
  const labels: Record<string, string> = {
    publish_paper: '论文发表',
    start_project: '项目启动',
    join_conference: '会议参加',
  }
  return labels[type] || '动态'
}

const getEmptyStateText = () => {
  const texts = {
    chat: '还没有私信对话，去发现页面找找感兴趣的研究者吧！',
    system: '暂无系统通知',
    activity: '还没有关注任何人，去关注一些研究者来接收他们的动态吧！',
  }
  return texts[activeCategory.value as 'chat' | 'system' | 'activity'] || '暂无消息'
}

const formatTime = (dateString: string | Date) => {
  let date: Date
  if (typeof dateString === 'string') {
    date = new Date(dateString)
    if (isNaN(date.getTime())) return '未知时间'
  } else {
    date = dateString
  }
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

// 打开设置对话框
const openSettingsDialog = async () => {
  try {
    const response = await messagesAPI.getMessageSettings()
    Object.assign(messageSettings, response.settings)
    showSettingsDialog.value = true
  } catch (error) {
    ElMessage.error('加载设置失败')
  }
}

// 保存设置
const saveSettings = async () => {
  try {
    await messagesAPI.saveMessageSettings(messageSettings)
    ElMessage.success('设置保存成功')
    showSettingsDialog.value = false
    loadCurrentCategory() // 重新加载消息，应用新的设置
  } catch (error) {
    ElMessage.error('保存设置失败')
  }
}

// 加载当前分类数据
const loadCurrentCategory = async () => {
  try {
    if (activeCategory.value === 'chat') {
      const res = await messagesAPI.getConversations()
      conversations.value = res.list
      messageCategories.value[0].unreadCount = res.unreadCount || 0
    } else if (activeCategory.value === 'system') {
      const res = await messagesAPI.getSystemNotifications()
      systemNotifications.value = res.list
      messageCategories.value[1].unreadCount = res.unreadCount || 0
    } else if (activeCategory.value === 'activity') {
      const res = await messagesAPI.getActivityNotifications()
      activityNotifications.value = res.list
      messageCategories.value[2].unreadCount = res.unreadCount || 0
    }
  } catch (error) {
    ElMessage.error('加载消息失败')
  }
}

// 加载全部好友
const loadAllFriends = async () => {
  try {
    const res = await messagesAPI.getFriends()
    allFriends.value = res.list
  } catch (error) {
    ElMessage.error('加载好友失败')
  }
}

// 页面初始化
onMounted(async () => {
  // 先加载设置，但不显示对话框
  try {
    const response = await messagesAPI.getMessageSettings()
    Object.assign(messageSettings, response.settings)
  } catch (error) {
    console.warn('加载设置失败，使用默认设置')
  }
  
  // 并行加载数据
  await Promise.all([
    loadCurrentCategory(),
    loadAllFriends()
  ])
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>