import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Notification, WebSocketNotification } from '@/api/types/notification'
import { wsService } from '@/utils/websocket'
import { useUserStore } from './user'
import { messagesAPI } from '@/api/modules/messages'

export const useNotificationStore = defineStore(
  'notification',
  () => {
    const notifications = ref<Notification[]>([])
    const unreadCount = ref(0)

    // 初始化 WebSocket 连接
    function initializeWebSocket() {
      const userStore = useUserStore()
      if (userStore.user?.id) {
        wsService.connect(String(userStore.user.id))

        wsService.on('notification', data => {
          handleWebSocketMessage(data as WebSocketNotification)
        })

        console.log('WebSocket 监听器已设置')
      }
    }

    // 处理 WebSocket 消息
    function handleWebSocketMessage(message: WebSocketNotification) {
      // 转换为内部通知格式
      const notification: Notification = {
        id: message.notification.id,
        name: message.name,
        content: message.notification.content,
        createdAt: message.notification.createdAt,
        isRead: message.notification.isRead,
        type: message.notification.type,
        userId: message.notification.userId,
        publicationId: message.publicationId,
        avatarUrl: message.avatarUrl,
        senderId: message.notification.senderId,
      }

      handleNewNotification(notification)
    }

    // 处理新通知
    function handleNewNotification(notification: Notification) {
      // 检查是否已存在相同ID的通知，避免重复
      const existingIndex = notifications.value.findIndex(n => n.id === notification.id)
      if (existingIndex === -1) {
        notifications.value.unshift(notification)
        if (!notification.isRead) {
          unreadCount.value++
        }
        // 新增：按时间倒序排序
        notifications.value.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        //console.log('添加新通知:', notification)
      } else {
        //console.log('通知已存在，跳过:', notification.id)
      }
    }

    // 标记通知为已读
    async function markNotificationAsRead(category: string, id: number) {
      try {
        await messagesAPI.markAsRead(category, id)
        // 找到通知索引
        const index = notifications.value.findIndex(n => n.id === id)
        if (index !== -1) {
          // 如果未读，减少未读数
          if (!notifications.value[index].isRead) {
            unreadCount.value = Math.max(0, unreadCount.value - 1)
          }
          // 移除该通知
          notifications.value.splice(index, 1)
          console.log('已读并移除通知:', id)
        }
      } catch (error) {
        console.error('标记通知已读失败:', error)
      }
    }

    // 清除所有通知
    function clearNotifications() {
      notifications.value = []
      unreadCount.value = 0
      console.log('清除所有通知')
    }

    return {
      notifications,
      unreadCount,
      initializeWebSocket,
      markNotificationAsRead,
      clearNotifications,
    }
  },
  {
    persist: {
      key: 'notification-store',
      storage: localStorage,
      paths: ['notifications', 'unreadCount'],
    },
  }
)
