import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: number | string
  name: string
  email: string
  gender: string
  institution: string
  imgUrl: string
  title: string
  researchArea: string // 建议前端用数组
  followerNum: string
  publishNum: string
  subjectNum: string
  createdAt: string
  bio: string
  avatar?: string // 添加头像字段，用于聊天
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const token = ref<string | null>(null)

  // 计算属性
  const userInfo = computed(() => user.value)
  const userId = computed(() => user.value?.id)
  const userAvatar = computed(() => user.value?.avatar || user.value?.imgUrl)

  const setUser = (userData: User) => {
    user.value = userData
    isAuthenticated.value = true
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const clearUser = () => {
    user.value = null
    isAuthenticated.value = false
    token.value = null
    localStorage.removeItem('token')
  }

  // 初始化时从 localStorage 恢复 token
  const initializeAuth = () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
      // 这里可以验证 token 有效性，如果有效则设置 isAuthenticated = true
    }
  }

  return {
    user,
    isAuthenticated,
    token,
    userInfo,
    userId,
    userAvatar,
    setUser,
    setToken,
    clearUser,
    initializeAuth
  }
})