import { defineStore } from 'pinia'
import { getUserDetail } from '@/api/modules/user'
import type { UserDetail } from '@/api/types/user'

export const useUserCacheStore = defineStore('userCache', {
  state: () => ({
    userInfoCache: new Map<number, UserDetail | null>(),
  }),

  actions: {
    // 获取用户信息（带缓存）
    async getCachedUserInfo(userId: number): Promise<UserDetail | null> {
      // 先检查缓存
      if (this.userInfoCache.has(userId)) {
        return this.userInfoCache.get(userId) || null
      }

      try {
        const response = await getUserDetail(userId)
        const userInfo = response.data
        this.userInfoCache.set(userId, userInfo) // 缓存用户信息
        return userInfo
      } catch (error) {
        console.error(`获取用户 ${userId} 信息失败:`, error)
        this.userInfoCache.set(userId, null) // 缓存失败结果，避免重复请求
        return null
      }
    },

    // 清除缓存
    clearCache() {
      this.userInfoCache.clear()
    },

    // 获取缓存大小
    getCacheSize(): number {
      return this.userInfoCache.size
    },

    // 检查用户是否在缓存中
    isUserCached(userId: number): boolean {
      return this.userInfoCache.has(userId)
    },
  },
})
