import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
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
