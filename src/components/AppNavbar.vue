<template>
  <nav
    class="bg-gradient-to-r from-slate-50/90 via-white/95 to-neutral-100/90 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-sm"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- 左侧 Logo 和主导航 -->
        <div class="flex">
          <!-- Logo -->
          <router-link
            to="/"
            class="flex items-center px-4 text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <svg class="w-8 h-8 mr-2" viewBox="0 0 32 32" fill="none">
              <circle cx="8" cy="16" r="4" fill="#6366F1" />
              <circle cx="24" cy="8" r="3" fill="#6366F1" />
              <circle cx="24" cy="24" r="3" fill="#6366F1" />
              <line x1="11.2" y1="14.8" x2="21" y2="9.5" stroke="#6366F1" stroke-width="2" />
              <line x1="11.2" y1="17.2" x2="21" y2="22.5" stroke="#6366F1" stroke-width="2" />
            </svg>
            KnoWeb
          </router-link>

          <!-- 主导航菜单 -->
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <router-link
              to="/"
              :class="[
                'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-all duration-300 hover:scale-105',
                $route.path === '/'
                  ? 'border-indigo-500 text-indigo-700 bg-indigo-50/50 rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50/50 rounded-t-lg',
              ]"
            >
              首页
            </router-link>

            <router-link
              to="/discover"
              :class="[
                'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-all duration-300 hover:scale-105',
                $route.path === '/discover'
                  ? 'border-indigo-500 text-indigo-700 bg-indigo-50/50 rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50/50 rounded-t-lg',
              ]"
            >
              科研发现
            </router-link>

            <router-link
              to="/library"
              :class="[
                'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-all duration-300 hover:scale-105',
                $route.path === '/library'
                  ? 'border-indigo-500 text-indigo-700 bg-indigo-50/50 rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50/50 rounded-t-lg',
              ]"
            >
              文献库
            </router-link>

            <router-link
              to="/research/projects"
              :class="[
                'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-all duration-300 hover:scale-105',
                $route.path === '/research/projects'
                  ? 'border-indigo-500 text-indigo-700 bg-indigo-50/50 rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50/50 rounded-t-lg',
              ]"
            >
              科研项目
            </router-link>

            <router-link
              to="/research/qa"
              :class="[
                'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-all duration-300 hover:scale-105',
                $route.path === '/research/qa'
                  ? 'border-indigo-500 text-indigo-700 bg-indigo-50/50 rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50/50 rounded-t-lg',
              ]"
            >
              科研问答
            </router-link>

            <router-link
              to="/research/knowledge-graph"
              :class="[
                'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-all duration-300 hover:scale-105',
                $route.path === '/research/knowledge-graph'
                  ? 'border-indigo-500 text-indigo-700 bg-indigo-50/50 rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50/50 rounded-t-lg',
              ]"
            >
              知识图谱
            </router-link>
          </div>
        </div>

        <!-- 右侧用户菜单和通知 -->
        <div class="flex items-center space-x-4">
          <!-- 通知按钮 -->
          <div
            v-if="isAuthenticated"
            class="relative"
            @mouseenter="handleNotificationHover(true)"
            @mouseleave="handleNotificationHover(false)"
          >
            <button
              class="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition-colors"
              @click="toggleNotifications"
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
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="showNotifications"
                class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                @mouseenter="handleNotificationMenuHover(true)"
                @mouseleave="handleNotificationMenuHover(false)"
              >
                <div class="p-4 border-b border-gray-200">
                  <h3 class="text-lg font-medium text-gray-900">通知</h3>
                </div>
                <div class="max-h-96 overflow-y-auto">
                  <div
                    v-for="notification in notificationStore.notifications"
                    :key="notification.id"
                    :class="[
                      'p-4 border-b hover:bg-gray-50 cursor-pointer',
                      { 'bg-blue-50': !notification.isRead },
                    ]"
                    @click="handleNotificationClick(notification)"
                  >
                    <div class="flex items-start space-x-3">
                      <div class="flex-shrink-0">
                        <img
                          :src="
                            notification.avatarUrl
                              ? `${API_BASE_URL}${notification.avatarUrl}`
                              : `http://api.btstu.cn/sjtx/api.php?lx=${'c2'}`
                          "
                          :alt="(notification.senderId || notification.userId).toString()"
                          class="h-8 w-8 rounded-full"
                        />
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900">{{ notification.name }}</p>
                        <p class="text-sm text-gray-500">{{ notification.content }}</p>
                        <p class="text-xs text-gray-400">
                          {{ formatTime(notification.createdAt) }}
                        </p>
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
            </transition>
          </div>

          <!-- 用户菜单 -->
          <div
            v-if="isAuthenticated"
            class="relative"
            @mouseenter="handleUserMenuHover(true)"
            @mouseleave="handleUserMenuHover(false)"
          >
            <button
              class="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:scale-105 hover:shadow-md p-1"
              @click="toggleUserMenu"
            >
              <img
                :src="currentUser?.imgUrl || `/default-avatar.png`"
                :alt="currentUser?.name"
                class="h-8 w-8 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
              <span class="hidden md:block text-slate-700 font-medium">{{
                currentUser?.name
              }}</span>
              <svg
                class="h-4 w-4 text-slate-400 transition-transform duration-200"
                :class="{ 'rotate-180': showUserMenu }"
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
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                @mouseenter="handleUserMenuDropdownHover(true)"
                @mouseleave="handleUserMenuDropdownHover(false)"
              >
                <div class="py-1">
                  <router-link
                    to="/profile"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    @click="closeUserMenu"
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
                    to="/messages"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    @click="closeUserMenu"
                  >
                    <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    消息中心
                  </router-link>

                  <router-link
                    to="/learning"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    @click="closeUserMenu"
                  >
                    <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 20h9"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m0 0H3m9 0a9 9 0 100-18 9 9 0 000 18z"
                      />
                    </svg>
                    学习档案
                  </router-link>

                  <router-link
                    to="/achievements"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    @click="closeUserMenu"
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
                    to="/research/my-workspace"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    @click="closeUserMenu"
                  >
                    <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 7a2 2 0 012-2h3.172a2 2 0 011.414.586l1.828 1.828A2 2 0 0012.828 8H19a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                      />
                    </svg>
                    项目管理
                  </router-link>

                  <router-link
                    to="/research/my-questions"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    @click="closeUserMenu"
                  >
                    <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                      />
                    </svg>
                    我的问答
                  </router-link>

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
            </transition>
          </div>

          <!-- 未登录状态 -->
          <div v-else class="flex items-center space-x-3">
            <router-link
              to="/login"
              class="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-5 py-2 text-sm font-semibold rounded-full shadow-sm border border-indigo-200 transition-all duration-200"
            >
              登录/注册
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
          to="/library"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          @click="showMobileMenu = false"
        >
          文献库
        </router-link>

        <router-link
          to="/research/projects"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          @click="showMobileMenu = false"
        >
          科研项目
        </router-link>

        <router-link
          to="/research/qa"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          @click="showMobileMenu = false"
        >
          科研问答
        </router-link>

        <router-link
          to="/research/knowledge-graph"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          @click="showMobileMenu = false"
        >
          知识图谱
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useNotificationStore } from '@/stores/notification'
import { wsService } from '@/utils/websocket'
import { useUserStore } from '@/stores/user'
import { logoutUser } from '@/api/modules/user'
import type { Notification } from '@/api/types/notification'

const router = useRouter()
const notificationStore = useNotificationStore()
const userStore = useUserStore()

// 响应式数据
const showNotifications = ref(false)
const showUserMenu = ref(false)
const showMobileMenu = ref(false)

// hover 状态管理
const isHoveringNotification = ref(false)
const isHoveringNotificationMenu = ref(false)
const isHoveringUserMenu = ref(false)
const isHoveringUserMenuDropdown = ref(false)

// 定时器
let notificationTimer: number | null = null
let userMenuTimer: number | null = null

// currentUser 响应式对象，自动同步 userStore.user
const currentUser = computed(() => userStore.user)

// 模拟用户状态
const isAuthenticated = computed(() => userStore.isAuthenticated)

// 通知相关的 hover 处理
const handleNotificationHover = (isHovering: boolean) => {
  isHoveringNotification.value = isHovering

  if (notificationTimer) {
    clearTimeout(notificationTimer)
    notificationTimer = null
  }

  if (isHovering) {
    showNotifications.value = true
  } else {
    notificationTimer = window.setTimeout(() => {
      if (!isHoveringNotificationMenu.value) {
        showNotifications.value = false
      }
    }, 150)
  }
}

const handleNotificationMenuHover = (isHovering: boolean) => {
  isHoveringNotificationMenu.value = isHovering

  if (notificationTimer) {
    clearTimeout(notificationTimer)
    notificationTimer = null
  }

  if (!isHovering) {
    notificationTimer = window.setTimeout(() => {
      if (!isHoveringNotification.value) {
        showNotifications.value = false
      }
    }, 150)
  }
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

// 用户菜单相关的 hover 处理
const handleUserMenuHover = (isHovering: boolean) => {
  isHoveringUserMenu.value = isHovering

  if (userMenuTimer) {
    clearTimeout(userMenuTimer)
    userMenuTimer = null
  }

  if (isHovering) {
    showUserMenu.value = true
  } else {
    userMenuTimer = window.setTimeout(() => {
      if (!isHoveringUserMenuDropdown.value) {
        showUserMenu.value = false
      }
    }, 150)
  }
}

const handleUserMenuDropdownHover = (isHovering: boolean) => {
  isHoveringUserMenuDropdown.value = isHovering

  if (userMenuTimer) {
    clearTimeout(userMenuTimer)
    userMenuTimer = null
  }

  if (!isHovering) {
    userMenuTimer = window.setTimeout(() => {
      if (!isHoveringUserMenu.value) {
        showUserMenu.value = false
      }
    }, 150)
  }
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const closeUserMenu = () => {
  showUserMenu.value = false
}

// 监听用户登录状态变化
watch(isAuthenticated, (newValue, oldValue) => {
  console.log('用户登录状态变化:', oldValue, '->', newValue)
  if (newValue && userStore.user?.id) {
    console.log('用户登录，初始化 WebSocket')
    notificationStore.initializeWebSocket()
  } else if (!newValue) {
    console.log('用户退出，断开 WebSocket')
    wsService.disconnect()
    notificationStore.clearNotifications()
  }
})

const parseActivityType = (content: string) => {
  if (/上传了新成果|上传/.test(content)) return 'publish_paper'
  if (/申请加入|申请请求|提交申请/.test(content)) return 'start_project'
  if (/同意了.*申请/.test(content)) return 'start_project'
  if (/论文/.test(content)) return 'publish_paper'
  if (/回答被点赞|被点赞/.test(content)) return 'like'
  if (/有了新回答/.test(content)) return 'question_answer'
  if (/评论/.test(content)) return 'comment'
  if (/关注了你|你关注的用户|关注/.test(content)) return 'follow'
  return 'activity'
}

const handleNotificationClick = async (notification: Notification) => {
  if (!notification.isRead) {
    const type = parseActivityType(notification.content)
    await notificationStore.markNotificationAsRead(notification.type, notification.id)
    switch (type) {
    case 'follow':
      router.push(`/user/${notification.senderId}`)
      break
    case 'publish_paper':
      router.push(`/publication/${notification.publicationId}`)
      break
    case 'start_project':
      router.push(`/research/my-workspace`)
      break
    case 'question_answer':
      router.push(`/research/my-questions`)
      break
    case 'like':
      router.push(`/research/my-questions`)
      break
  }
  }
  showNotifications.value = false
  // 根据通知类型跳转
  
}

const logout = async () => {
  try {
    // 调用后端退出登录接口
    await logoutUser()
  } catch (error) {
    console.error('退出登录请求失败:', error)
    // 即使后端请求失败，也要清除前端状态
  } finally {
    // 清除前端状态
    localStorage.removeItem('token')
    userStore.clearUser()
    userStore.clearToken()
    notificationStore.clearNotifications()
    wsService.disconnect()

    showUserMenu.value = false
    ElMessage.success('已退出登录')
    router.push('/login')
  }
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

onMounted(() => {
  // 初始化时检查用户状态
  if (userStore.isAuthenticated && userStore.user?.id) {
    console.log('组件挂载时用户已登录，初始化 WebSocket')
    notificationStore.initializeWebSocket()
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  // 清理定时器
  if (notificationTimer) {
    clearTimeout(notificationTimer)
  }
  if (userMenuTimer) {
    clearTimeout(userMenuTimer)
  }
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

/* 过渡动画 */
.transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 旋转动画 */
.rotate-180 {
  transform: rotate(180deg);
}
</style>
