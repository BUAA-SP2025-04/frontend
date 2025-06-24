import { defineStore } from 'pinia'
import { ref } from 'vue'

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
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(true)

  const setUser = (userData: User) => {
    user.value = userData
    isAuthenticated.value = true
  }

  const clearUser = () => {
    user.value = null
    isAuthenticated.value = false
  }

  return {
    user,
    isAuthenticated,
    setUser,
    clearUser,
  }
})
