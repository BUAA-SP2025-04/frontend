import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Notification, WebSocketMessage } from '@/api/types/notification'
import { wsService } from '@/utils/websocket'
import request from '@/utils/request'
import { useUserStore } from './user'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([])
  const unreadCount = ref(0)

  // 初始化 WebSocket 连接
  function initializeWebSocket() {
    const userStore = useUserStore()
    console.log('初始化WebSocket', userStore.user)
    if (userStore.user?.id) {
      wsService.connect(String(userStore.user.id))
      wsService.onMessage(handleWebSocketMessage)
    }
  }

  // 处理 WebSocket 消息
  function handleWebSocketMessage(message: WebSocketMessage) {
    console.log('收到WebSocket消息:', message)
    // 假设消息格式为 { type: string, data: any }
    if (typeof message === 'string') {
      try {
        const notification: Notification = {
          id: Date.now(), // 临时 ID
          content: message,
          createdAt: new Date().toISOString(),
          isRead: false,
          type: 'system',
          userId: 0,
          publicationId: 0,
          avatarUrl: '',
        }
        console.log(message)
        handleNewNotification(notification)
      } catch (error) {
        console.error('解析消息失败:', error)
      }
    } else {
      switch (message.type) {
        case 'notification':
          handleNewNotification(message.data)
          break
        case 'error':
          console.error('WebSocket 错误:', message.data)
          break
      }
    }
  }

  // 处理新通知
  function handleNewNotification(notification: Notification) {
    notifications.value.unshift(notification)
    if (!notification.isRead) {
      unreadCount.value++
    }
  }

  // 标记通知为已读
  async function markAsRead(notificationId: number) {
    try {
      await request.put(`/notifications/${notificationId}/read`)
      const notification = notifications.value.find(n => n.id === notificationId)
      if (notification && !notification.isRead) {
        notification.isRead = true
        unreadCount.value = Math.max(0, unreadCount.value - 1)
      }
    } catch (error) {
      console.error('标记通知已读失败:', error)
    }
  }

  // 获取历史通知
  async function fetchHistoryNotifications() {
    try {
      const response = await request.get('/notifications')
      notifications.value = response.data.notifications
      unreadCount.value = response.data.unreadCount
    } catch (error) {
      console.error('获取历史通知失败:', error)
    }
  }

  // 清除所有通知
  function clearNotifications() {
    notifications.value = []
    unreadCount.value = 0
  }

  return {
    notifications,
    unreadCount,
    initializeWebSocket,
    markAsRead,
    fetchHistoryNotifications,
    clearNotifications,
  }
})
