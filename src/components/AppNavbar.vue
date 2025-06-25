<template>
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- 左侧 Logo 和主导航 -->
        <div class="flex">
          <!-- Logo -->
          <router-link
            to="/"
            class="flex items-center px-4 text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.09-.21 2.09-.64 3-1.22.91.58 1.91 1.01 3 1.22 5.16-1 9-5.45 9-11V7l-10-5z"
              />
            </svg>
            KnoWeb
          </router-link>

          <!-- 主导航菜单 -->
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <router-link
              to="/"
              :class="[
                'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200',
                $route.path === '/'
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              首页
            </router-link>

            <router-link
              to="/discover"
              :class="[
                'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200',
                $route.path === '/discover'
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              科研发现
            </router-link>

            <router-link
              to="/timeline"
              :class="[
                'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200',
                $route.path === '/timeline'
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              朋友圈
            </router-link>

            <router-link
              to="/library"
              :class="[
                'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200',
                $route.path === '/library'
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              文献库
            </router-link>

            <router-link
              to="/pdf-reader"
              :class="[
                'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200',
                $route.path === '/pdf-reader'
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              PDF阅读器
            </router-link>

            <router-link
              to="/visualization"
              :class="[
                'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200',
                $route.path === '/visualization'
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              数据可视化
            </router-link>
          </div>
        </div>

        <!-- 右侧用户菜单和通知 -->
        <div class="flex items-center space-x-4">
          <!-- 通知按钮 -->
          <div v-if="isAuthenticated" class="relative">
            <button
              class="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition-colors"
              @click="showNotifications = !showNotifications"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <!-- 未读通知红点 -->
              <span
                v-if="notificationStore.unreadCount > 0"
                class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
              >
                {{ notificationStore.unreadCount > 9 ? '9+' : notificationStore.unreadCount }}
              </span>
            </button>

            <!-- 通知下拉菜单 -->
            <div
              v-if="showNotifications"
              class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              @click.stop
            >
              <div class="p-4 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">通知</h3>
              </div>
              <div class="max-h-96 overflow-y-auto">
                <div
                  v-for="notification in notificationStore.notifications"
                  :key="notification.id"
                  :class="['p-4 border-b hover:bg-gray-50', { 'bg-blue-50': !notification.isRead }]"
                  @click="handleNotificationClick(notification)"
                >
                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0">
                      <img
                        :src="`https://api.dicebear.com/7.x/avatars/svg?seed=${notification.userId}`"
                        :alt="notification.userId.toString()"
                        class="h-8 w-8 rounded-full"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900">
                        用户 #{{ notification.userId }}
                      </p>
                      <p class="text-sm text-gray-500">{{ notification.content }}</p>
                      <p class="text-xs text-gray-400">{{ formatTime(notification.createdAt) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-4 text-center">
                <router-link to="/messages" class="text-sm text-indigo-600 hover:text-indigo-700">
                  查看所有通知
                </router-link>
              </div>
            </div>
          </div>

          <!-- 用户菜单 -->
          <div v-if="isAuthenticated" class="relative">
            <button
              class="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="showUserMenu = !showUserMenu"
            >
              <img
                :src="currentUser?.imgUrl || `http://api.btstu.cn/sjtx/api.php?lx=${'b1'}`"
                :alt="currentUser?.name"
                class="h-8 w-8 rounded-full object-cover"
              />
              <span class="hidden md:block text-gray-700 font-medium">{{ currentUser?.name }}</span>
              <svg
                class="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- 用户下拉菜单 -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            >
              <div class="py-1">
                <router-link
                  to="/profile"
                  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  个人资料
                </router-link>

                <router-link
                  to="/achievements"
                  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  科研成果
                </router-link>

                <router-link
                  to="/follow"
                  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  我的关注
                </router-link>

                <div class="border-t border-gray-100"></div>

                <button
                  class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  @click="logout"
                >
                  <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  退出登录
                </button>
              </div>
            </div>
          </div>

          <!-- 未登录状态 -->
          <div v-else class="flex items-center space-x-3">
            <router-link
              to="/login"
              class="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors"
            >
              登录
            </router-link>
            <router-link
              to="/register"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium rounded-md transition-colors"
            >
              注册
            </router-link>
          </div>

          <!-- 移动端菜单按钮 -->
          <button
            class="md:hidden p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
            @click="showMobileMenu = !showMobileMenu"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                :class="{ hidden: showMobileMenu, 'inline-flex': !showMobileMenu }"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                :class="{ hidden: !showMobileMenu, 'inline-flex': showMobileMenu }"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <div v-if="showMobileMenu" class="md:hidden bg-white border-t border-gray-200">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          to="/"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          @click="showMobileMenu = false"
        >
          首页
        </router-link>

        <router-link
          to="/discover"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          @click="showMobileMenu = false"
        >
          科研发现
        </router-link>

        <router-link
          to="/timeline"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          @click="showMobileMenu = false"
        >
          动态时间线
        </router-link>

        <router-link
          to="/library"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          @click="showMobileMenu = false"
        >
          文献库
        </router-link>

        <router-link
          to="/pdf-reader"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          @click="showMobileMenu = false"
        >
          PDF阅读器
        </router-link>

        <router-link
          to="/visualization"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          @click="showMobileMenu = false"
        >
          数据可视化
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useNotificationStore } from '@/stores/notification'
import type { Notification } from '@/api/types/notification'
import { wsService } from '@/utils/websocket'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const notificationStore = useNotificationStore()
const userStore = useUserStore()
console.log('userStore.user:', userStore.user)

// 响应式数据
const showNotifications = ref(false)
const showUserMenu = ref(false)
const showMobileMenu = ref(false)

// currentUser 响应式对象，自动同步 userStore.user
const currentUser = computed(() => userStore.user)

// 模拟用户状态
const isAuthenticated = computed(() => userStore.isAuthenticated)

const handleNotificationClick = async (notification: Notification) => {
  if (!notification.isRead) {
    await notificationStore.markAsRead(notification.id)
  }
  showNotifications.value = false

  // 根据通知类型跳转
  switch (notification.type) {
    case 'message':
      router.push(`/chat/${notification.userId}`)
      break
    case 'comment':
      router.push('/timeline')
      break
    case 'collaboration':
      router.push('/library')
      break
    case 'system':
      // 系统通知不跳转
      break
  }
}

const logout = () => {
  localStorage.removeItem('token')
  userStore.clearUser()
  userStore.clearToken()
  notificationStore.clearNotifications() // 清除通知
  wsService.disconnect() // 断开 WebSocket 连接
  ElMessage.success('已退出登录')
  router.push('/login')
}

const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  return `${days}天前`
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement

  if (!target.closest('.relative')) {
    showNotifications.value = false
    showUserMenu.value = false
  }
}

onMounted(() => {
  // 如果已登录，初始化 WebSocket 连接
  if (userStore.isAuthenticated && userStore.user?.id) {
    notificationStore.initializeWebSocket()
    // 获取历史通知
    notificationStore.fetchHistoryNotifications()
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  // 关闭 WebSocket 连接
  wsService.disconnect()
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* 确保导航栏在顶层 */
nav {
  backdrop-filter: blur(8px);
}

/* 自定义滚动条 */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
