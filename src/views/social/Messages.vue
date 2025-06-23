<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 flex items-center">
            <svg
              class="w-8 h-8 mr-3 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            消息中心
          </h1>
          <p class="text-gray-600 mt-2">管理您的私信、系统通知和动态提醒</p>
        </div>

        <!-- 消息设置按钮 -->
        <el-button @click="showSettingsDialog = true">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
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
              <button
                v-for="category in messageCategories"
                :key="category.id"
                :class="[
                  'w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors',
                  activeCategory === category.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100',
                ]"
                @click="setActiveCategory(category.id)"
              >
                <div class="flex items-center">
                  <component :is="category.icon" class="w-5 h-5 mr-3" />
                  <span class="font-medium">{{ category.name }}</span>
                </div>
                <span
                  v-if="category.unreadCount > 0"
                  class="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center"
                >
                  {{ category.unreadCount > 99 ? '99+' : category.unreadCount }}
                </span>
              </button>
            </nav>

            <!-- 在线用户快速开始聊天 -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <h4 class="text-sm font-medium text-gray-900 mb-3">在线好友</h4>
              <div class="space-y-2">
                <div
                  v-for="friend in onlineFriends"
                  :key="friend.id"
                  class="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  @click="startChat(friend.id)"
                >
                  <div class="relative">
                    <img
                      :src="friend.avatar"
                      :alt="friend.name"
                      class="w-8 h-8 rounded-full object-cover"
                    />
                    <div
                      class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                    ></div>
                  </div>
                  <div class="ml-3 flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ friend.name }}</p>
                    <p class="text-xs text-gray-500 truncate">{{ friend.status }}</p>
                  </div>
                </div>
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
                <el-input
                  v-model="searchQuery"
                  placeholder="搜索消息内容、发送者..."
                  prefix-icon="Search"
                  size="large"
                />
              </div>
              <el-select
                v-model="messageFilter"
                placeholder="消息类型"
                size="large"
                style="width: 150px"
              >
                <el-option label="全部" value="all" />
                <el-option label="未读" value="unread" />
                <el-option label="已读" value="read" />
                <el-option label="重要" value="important" />
              </el-select>
              <el-button @click="markAllAsRead" :disabled="!hasUnreadMessages">
                全部标记为已读
              </el-button>
            </div>
          </div>

          <!-- 消息列表 -->
          <div class="bg-white rounded-lg shadow">
            <!-- 私信列表 -->
            <div v-if="activeCategory === 'chat'" class="divide-y divide-gray-200">
              <div
                v-for="conversation in filteredConversations"
                :key="conversation.id"
                :class="[
                  'p-6 hover:bg-gray-50 cursor-pointer transition-colors',
                  !conversation.isRead ? 'bg-blue-50' : '',
                ]"
                @click="openChat(conversation.userId)"
              >
                <div class="flex items-start space-x-4">
                  <div class="relative flex-shrink-0">
                    <img
                      :src="conversation.avatar"
                      :alt="conversation.name"
                      class="w-12 h-12 rounded-full object-cover"
                    />
                    <div
                      v-if="conversation.isOnline"
                      class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                    ></div>
                  </div>

                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <h3 class="text-sm font-medium text-gray-900">{{ conversation.name }}</h3>
                      <div class="flex items-center space-x-2">
                        <span class="text-xs text-gray-500">{{
                          formatTime(conversation.lastMessageTime)
                        }}</span>
                        <span
                          v-if="conversation.unreadCount > 0"
                          class="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center"
                        >
                          {{ conversation.unreadCount }}
                        </span>
                      </div>
                    </div>

                    <p class="text-sm text-gray-600 mt-1 line-clamp-2">
                      <span v-if="conversation.lastMessage.isMe" class="text-gray-400">我：</span>
                      {{ conversation.lastMessage.content }}
                    </p>

                    <div class="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                      <span>{{ conversation.institution }}</span>
                      <span
                        v-if="conversation.lastMessage.type === 'file'"
                        class="flex items-center"
                      >
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                          <path
                            fill-rule="evenodd"
                            d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                            clip-rule="evenodd"
                          />
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
              <div
                v-for="notification in filteredSystemNotifications"
                :key="notification.id"
                :class="[
                  'p-6 hover:bg-gray-50 transition-colors',
                  !notification.isRead ? 'bg-blue-50' : '',
                ]"
              >
                <div class="flex items-start space-x-4">
                  <div
                    :class="[
                      'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
                      getNotificationIconColor(notification.type),
                    ]"
                  >
                    <component :is="getNotificationIcon(notification.type)" class="w-5 h-5" />
                  </div>

                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <h3 class="text-sm font-medium text-gray-900">{{ notification.title }}</h3>
                      <span class="text-xs text-gray-500">{{
                        formatTime(notification.createdAt)
                      }}</span>
                    </div>

                    <p class="text-sm text-gray-600 mt-1">{{ notification.content }}</p>

                    <div v-if="notification.action" class="mt-3">
                      <el-button
                        size="small"
                        type="primary"
                        @click="handleNotificationAction(notification)"
                      >
                        {{ notification.action.text }}
                      </el-button>
                    </div>
                  </div>

                  <div class="flex-shrink-0">
                    <el-dropdown trigger="click" @command="handleNotificationMenu">
                      <button class="p-1 hover:bg-gray-200 rounded-full transition-colors">
                        <svg
                          class="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item :command="`read-${notification.id}`">
                            {{ notification.isRead ? '标记为未读' : '标记为已读' }}
                          </el-dropdown-item>
                          <el-dropdown-item :command="`delete-${notification.id}`" divided
                            >删除</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </div>
              </div>
            </div>

            <!-- 动态提醒列表 -->
            <div v-else-if="activeCategory === 'activity'" class="divide-y divide-gray-200">
              <div
                v-for="activity in filteredActivityNotifications"
                :key="activity.id"
                :class="[
                  'p-6 hover:bg-gray-50 cursor-pointer transition-colors',
                  !activity.isRead ? 'bg-blue-50' : '',
                ]"
                @click="handleActivityClick(activity)"
              >
                <div class="flex items-start space-x-4">
                  <img
                    :src="activity.user.avatar"
                    :alt="activity.user.name"
                    class="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />

                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <p class="text-sm text-gray-900">
                        <span class="font-medium">{{ activity.user.name }}</span>
                        {{ getActivityText(activity.type) }}
                        <span class="font-medium">{{ activity.content.title }}</span>
                      </p>
                      <span class="text-xs text-gray-500">{{
                        formatTime(activity.createdAt)
                      }}</span>
                    </div>

                    <p class="text-sm text-gray-600 mt-1 line-clamp-2">
                      {{ activity.content.description }}
                    </p>

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

                  <div v-if="!activity.isRead" class="flex-shrink-0">
                    <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 空状态 -->
            <div v-if="filteredMessages.length === 0" class="p-12 text-center">
              <svg
                class="w-16 h-16 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-2">暂无消息</h3>
              <p class="text-gray-500">{{ getEmptyStateText() }}</p>
            </div>
          </div>

          <!-- 分页 -->
          <div v-if="filteredMessages.length > 0" class="mt-6 flex justify-center">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="pageSize"
              :total="filteredMessages.length"
              layout="prev, pager, next"
              background
            />
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
                <el-switch v-model="notificationSettings.newMessage" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">关注动态提醒</h4>
                  <p class="text-sm text-gray-500">关注的人发布新动态时通知</p>
                </div>
                <el-switch v-model="notificationSettings.followActivity" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">系统通知</h4>
                  <p class="text-sm text-gray-500">接收系统重要通知</p>
                </div>
                <el-switch v-model="notificationSettings.systemNotice" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">邮件通知</h4>
                  <p class="text-sm text-gray-500">通过邮件接收重要消息</p>
                </div>
                <el-switch v-model="notificationSettings.emailNotification" />
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
                <el-switch v-model="privacySettings.allowStrangerMessage" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">显示在线状态</h4>
                  <p class="text-sm text-gray-500">让其他用户看到您的在线状态</p>
                </div>
                <el-switch v-model="privacySettings.showOnlineStatus" />
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
import { ref, reactive, computed, h, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 图标组件
const ChatIcon = () =>
  h(
    'svg',
    {
      class: 'w-5 h-5',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      }),
    ]
  )

const BellIcon = () =>
  h(
    'svg',
    {
      class: 'w-5 h-5',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    [
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
    ]
  )

const ActivityIcon = () =>
  h(
    'svg',
    {
      class: 'w-5 h-5',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M13 10V3L4 14h7v7l9-11h-7z',
      }),
    ]
  )

// 响应式数据
const activeCategory = ref('chat')
const searchQuery = ref('')
const messageFilter = ref('all')
const currentPage = ref(1)
const pageSize = 20
const showSettingsDialog = ref(false)

// 消息分类
const messageCategories = ref([
  { id: 'chat', name: '私信', icon: ChatIcon, unreadCount: 5 },
  { id: 'system', name: '系统通知', icon: BellIcon, unreadCount: 2 },
  { id: 'activity', name: '动态提醒', icon: ActivityIcon, unreadCount: 8 },
])

// 在线好友
const onlineFriends = ref([
  {
    id: 1,
    name: '王芳',
    avatar: 'https://via.placeholder.com/100',
    status: '正在查看论文',
  },
  {
    id: 2,
    name: '张伟',
    avatar: 'https://via.placeholder.com/100',
    status: '在线',
  },
  {
    id: 3,
    name: '李华',
    avatar: 'https://via.placeholder.com/100',
    status: '忙碌中',
  },
])

// 私信对话列表
const conversations = ref([
  {
    id: 1,
    userId: 1,
    name: '王芳',
    avatar: 'https://via.placeholder.com/100',
    institution: '北京大学',
    isOnline: true,
    isRead: false,
    unreadCount: 3,
    lastMessage: {
      content: '您好，我对您最近发表的论文很感兴趣，想进一步交流合作的可能性...',
      isMe: false,
      type: 'text',
    },
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
  },
  {
    id: 2,
    userId: 2,
    name: '张伟',
    avatar: 'https://via.placeholder.com/100',
    institution: '中科院',
    isOnline: false,
    isRead: true,
    unreadCount: 0,
    lastMessage: {
      content: '好的，我会尽快整理相关资料发给您。',
      isMe: true,
      type: 'text',
    },
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
  },
  {
    id: 3,
    userId: 3,
    name: '陈华',
    avatar: 'https://via.placeholder.com/100',
    institution: '清华大学',
    isOnline: true,
    isRead: false,
    unreadCount: 1,
    lastMessage: {
      content: '会议PPT.pdf',
      isMe: false,
      type: 'file',
    },
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5小时前
  },
])

// 系统通知
const systemNotifications = ref([
  {
    id: 1,
    type: 'security',
    title: '账户安全提醒',
    content: '检测到您的账户在新设备登录，如非本人操作请及时修改密码。',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    action: {
      text: '查看详情',
      url: '/profile',
    },
  },
  {
    id: 2,
    type: 'update',
    title: '系统更新通知',
    content: 'KnoWeb平台已更新至v2.1版本，新增了文献智能推荐功能。',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    action: {
      text: '查看更新',
      url: '/updates',
    },
  },
])

// 动态提醒
const activityNotifications = ref([
  {
    id: 1,
    type: 'publish_paper',
    user: {
      id: 1,
      name: '王芳',
      avatar: 'https://via.placeholder.com/100',
      institution: '北京大学',
    },
    content: {
      title: 'Deep Learning在生物信息学中的应用',
      description:
        '本文探讨了深度学习技术在基因序列分析、蛋白质结构预测等生物信息学领域的最新应用...',
    },
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: 2,
    type: 'start_project',
    user: {
      id: 2,
      name: '张伟',
      avatar: 'https://via.placeholder.com/100',
      institution: '中科院',
    },
    content: {
      title: '量子计算优化算法研究',
      description: '启动新的研究项目，专注于量子计算在复杂优化问题中的应用研究...',
    },
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: 3,
    type: 'join_conference',
    user: {
      id: 3,
      name: '李华',
      avatar: 'https://via.placeholder.com/100',
      institution: '清华大学',
    },
    content: {
      title: 'ICML 2024 国际机器学习大会',
      description: '将参加在维也纳举办的ICML 2024大会，并做主题演讲...',
    },
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
  },
])

// 设置
const notificationSettings = reactive({
  newMessage: true,
  followActivity: true,
  systemNotice: true,
  emailNotification: false,
})

const privacySettings = reactive({
  allowStrangerMessage: true,
  showOnlineStatus: true,
})

// 计算属性
const filteredConversations = computed(() => {
  let result = conversations.value

  if (searchQuery.value) {
    result = result.filter(
      conv =>
        conv.name.includes(searchQuery.value) ||
        conv.lastMessage.content.includes(searchQuery.value)
    )
  }

  switch (messageFilter.value) {
    case 'unread':
      result = result.filter(conv => !conv.isRead)
      break
    case 'read':
      result = result.filter(conv => conv.isRead)
      break
  }

  return result
})

const filteredSystemNotifications = computed(() => {
  let result = systemNotifications.value

  if (searchQuery.value) {
    result = result.filter(
      notif => notif.title.includes(searchQuery.value) || notif.content.includes(searchQuery.value)
    )
  }

  switch (messageFilter.value) {
    case 'unread':
      result = result.filter(notif => !notif.isRead)
      break
    case 'read':
      result = result.filter(notif => notif.isRead)
      break
  }

  return result
})

const filteredActivityNotifications = computed(() => {
  let result = activityNotifications.value

  if (searchQuery.value) {
    result = result.filter(
      activity =>
        activity.user.name.includes(searchQuery.value) ||
        activity.content.title.includes(searchQuery.value) ||
        activity.content.description.includes(searchQuery.value)
    )
  }

  switch (messageFilter.value) {
    case 'unread':
      result = result.filter(activity => !activity.isRead)
      break
    case 'read':
      result = result.filter(activity => activity.isRead)
      break
  }

  return result
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
  currentPage.value = 1
}

const startChat = (userId: number) => {
  router.push(`/chat/${userId}`)
}

const openChat = (userId: number) => {
  router.push(`/chat/${userId}`)
}

const markAllAsRead = () => {
  // 标记所有消息为已读
  switch (activeCategory.value) {
    case 'chat':
      conversations.value.forEach(conv => {
        conv.isRead = true
        conv.unreadCount = 0
      })
      break
    case 'system':
      systemNotifications.value.forEach(notif => (notif.isRead = true))
      break
    case 'activity':
      activityNotifications.value.forEach(activity => (activity.isRead = true))
      break
  }

  // 更新分类未读数
  const category = messageCategories.value.find(cat => cat.id === activeCategory.value)
  if (category) {
    category.unreadCount = 0
  }

  ElMessage.success('已全部标记为已读')
}

const handleNotificationAction = (notification: any) => {
  if (notification.action?.url) {
    router.push(notification.action.url)
  }
}

const handleNotificationMenu = (command: string) => {
  const [action, id] = command.split('-')
  const notificationId = parseInt(id)

  if (action === 'read') {
    const notification = systemNotifications.value.find(n => n.id === notificationId)
    if (notification) {
      notification.isRead = !notification.isRead
      ElMessage.success(notification.isRead ? '已标记为已读' : '已标记为未读')
    }
  } else if (action === 'delete') {
    systemNotifications.value = systemNotifications.value.filter(n => n.id !== notificationId)
    ElMessage.success('删除成功')
  }
}

const handleActivityClick = (activity: any) => {
  activity.isRead = true
  // 跳转到相关页面，比如用户详情或论文详情
  router.push(`/user/${activity.user.id}`)
}

const getNotificationIcon = (type: string) => {
  const icons: Record<string, () => ReturnType<typeof h>> = {
    security: () =>
      h('svg', { class: 'w-5 h-5', fill: 'currentColor', viewBox: '0 0 20 20' }, [
        h('path', {
          'fill-rule': 'evenodd',
          d: 'M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z',
          'clip-rule': 'evenodd',
        }),
      ]),
    update: () =>
      h('svg', { class: 'w-5 h-5', fill: 'currentColor', viewBox: '0 0 20 20' }, [
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
    security: 'bg-red-100 text-red-600',
    update: 'bg-blue-100 text-blue-600',
  }
  return colors[type] || 'bg-gray-100 text-gray-600'
}

const getActivityText = (type: string) => {
  const texts = {
    publish_paper: '发表了新论文',
    start_project: '启动了新项目',
    join_conference: '参加了会议',
  }
  return texts[type as keyof typeof texts] || '有新动态'
}

const getActivityLabel = (type: 'publish_paper' | 'start_project' | 'join_conference' | string) => {
  const labels: Record<'publish_paper' | 'start_project' | 'join_conference', string> = {
    publish_paper: '论文发表',
    start_project: '项目启动',
    join_conference: '会议参加',
  }
  return (labels as Record<string, string>)[type] || '动态'
}

const getEmptyStateText = () => {
  const texts = {
    chat: '还没有私信对话，去发现页面找找感兴趣的研究者吧！',
    system: '暂无系统通知',
    activity: '还没有关注任何人，去关注一些研究者来接收他们的动态吧！',
  }
  return texts[activeCategory.value as 'chat' | 'system' | 'activity'] || '暂无消息'
}

const formatTime = (date: Date) => {
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

const saveSettings = () => {
  // 保存设置到后端
  ElMessage.success('设置保存成功')
  showSettingsDialog.value = false
}

// 监听路由变化，更新未读消息数
watch(
  () => activeCategory.value,
  () => {
    // 模拟实时更新未读消息数
  }
)

onMounted(() => {
  // 模拟WebSocket连接，实时接收消息
  // 这里可以初始化WebSocket连接
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
