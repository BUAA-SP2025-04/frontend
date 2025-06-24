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
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    user: null as User | null,
    isAuthenticated: false,
  }),
  actions: {
    init() {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      if (token && userStr) {
        this.token = token
        this.user = JSON.parse(userStr)
        this.isAuthenticated = true
      } else {
        this.token = ''
        this.user = null
        this.isAuthenticated = false
      }
    },
    setUser(userData: User) {
      this.user = userData
      this.isAuthenticated = true
      localStorage.setItem('user', JSON.stringify(userData))
    },
    clearUser() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('user')
    },
    setToken(token: string) {
      this.token = token
      this.isAuthenticated = true
      localStorage.setItem('token', token)
    },
    clearToken() {
      this.token = ''
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },
  },
})
