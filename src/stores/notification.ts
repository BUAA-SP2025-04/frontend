import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Notification, WebSocketMessage } from '@/api/types/notification'
import { wsService } from '@/utils/websocket'
import request from '@/utils/request'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([])
  const unreadCount = ref(0)

  // 初始化 WebSocket 连接
  function initializeWebSocket() {
    const token = localStorage.getItem('token')
    if (token) {
      wsService.connect(token)
      wsService.onMessage(handleWebSocketMessage)
    }
  }

  // 处理 WebSocket 消息
  function handleWebSocketMessage(message: WebSocketMessage) {
    switch (message.type) {
      case 'notification':
        handleNewNotification(message.data)
        break
      case 'error':
        console.error('WebSocket 错误:', message.data)
        break
      // 处理其他类型的消息
    }
  }

  // 处理新通知
  function handleNewNotification(data: unknown) {
    const notification = data as Notification
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

  return {
    notifications,
    unreadCount,
    initializeWebSocket,
    markAsRead,
    fetchHistoryNotifications,
  }
})
