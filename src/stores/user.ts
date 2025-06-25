import { defineStore } from 'pinia'

export interface User {
  id: number | string
  name: string
  email: string
  gender: string
  institution: string
  imgUrl: string
  title: string
  researchArea: string // 建议前端用数组
  followerNum: number
  publishNum: number
  subjectNum: number
  createdAt: string
  bio: string
  avatar: string // 添加头像字段，用于聊天
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    user: null as User | null,
    isAuthenticated: false,
  }),
  actions: {
    setUser(userData: Partial<User>) {
      if (userData.imgUrl && !userData.imgUrl.startsWith('http')) {
        userData.imgUrl = import.meta.env.VITE_API_BASE_URL + userData.imgUrl
      }
      this.user = { ...this.user, ...userData } as User
      this.isAuthenticated = true
    },
    clearUser() {
      this.user = null
      this.isAuthenticated = false
    },
    setToken(token: string) {
      this.token = token
      this.isAuthenticated = true
    },
    clearToken() {
      this.token = ''
      this.isAuthenticated = false
    },
  },
  persist: {
    key: 'user-store',
    storage: localStorage,
    paths: ['token', 'user', 'isAuthenticated'],
  },
})
