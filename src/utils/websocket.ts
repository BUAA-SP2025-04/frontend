import type { WebSocketMessage } from '@/api/types/notification'

export interface ChatMessage {
  type: 'message' | 'typing' | 'read' | 'online_status' | 'error' | 'ping' | 'pong'
  data: Record<string, unknown>
  timestamp: string
}

export interface FileInfo {
  fileName: string
  fileSize: number
  fileType: string
  fileUrl?: string
}

export class WebSocketService {
  private ws: WebSocket | null = null
  private readonly url: string
  private reconnectAttempts = 0
  private readonly maxReconnectAttempts = 5
  private reconnectTimeout: number = 1000
  private heartbeatTimer: number | null = null
  private listeners: { [key: string]: ((data?: unknown) => void)[] } = {}
  private token: string = ''

  constructor(url: string) {
    this.url = url
  }

  // 连接方法
  connect(userId: string) {
    try {
      this.ws = new WebSocket(`${this.url}?userId=${userId}`)

      this.ws.onopen = () => {
        console.log('WebSocket 连接成功')
        this.reconnectAttempts = 0
        this.startHeartbeat()
        this.emit('connected')
      }

      this.ws.onmessage = event => {
        try {
          const message = JSON.parse(event.data)

          // 处理心跳响应
          if (message.type === 'pong') {
            return
          }

          // 触发对应的监听器
          this.emit(message.type, message.data)

          // 兼容旧的通知系统
          if (message.type === 'notification') {
            this.emit('message', message as WebSocketMessage)
          }
        } catch (error) {
          console.error('解析消息失败:', error)
        }
      }

      this.ws.onclose = event => {
        console.log('WebSocket 连接关闭', event.code, event.reason)
        this.stopHeartbeat()
        this.emit('disconnected')

        // 非主动关闭时尝试重连
        if (event.code !== 1000) {
          this.reconnect(userId)
        }
      }

      this.ws.onerror = error => {
        console.error('WebSocket 错误:', error)
        this.emit('error', error)
      }
    } catch (error) {
      console.error('WebSocket 连接失败:', error)
      this.reconnect(userId)
    }
  }

  // 重连方法
  private reconnect(userId: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      console.log(`尝试重连... 第 ${this.reconnectAttempts} 次`)
      setTimeout(() => {
        this.connect(userId)
      }, this.reconnectTimeout * this.reconnectAttempts)
    } else {
      console.error('达到最大重连次数，停止重连')
      this.emit('reconnect_failed')
    }
  }

  // 心跳机制
  private startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.send({
          type: 'ping',
          data: {},
          timestamp: new Date().toISOString(),
        })
      }
    }, 30000) as unknown as number // 30秒心跳
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  // 发送消息 - 新增方法
  send(message: ChatMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    } else {
      console.error('WebSocket 未连接，无法发送消息')
      throw new Error('WebSocket 连接不可用')
    }
  }

  // 聊天专用方法
  sendTextMessage(conversationId: string, content: string, tempId: string) {
    this.send({
      type: 'message',
      data: {
        conversationId,
        type: 'text',
        content,
        tempId,
      },
      timestamp: new Date().toISOString(),
    })
  }

  sendFileMessage(conversationId: string, fileInfo: FileInfo, tempId: string) {
    this.send({
      type: 'message',
      data: {
        conversationId,
        type: 'file',
        content: fileInfo.fileName,
        fileInfo,
        tempId,
      },
      timestamp: new Date().toISOString(),
    })
  }

  sendTypingStatus(conversationId: string, isTyping: boolean) {
    this.send({
      type: 'typing',
      data: {
        conversationId,
        isTyping,
      },
      timestamp: new Date().toISOString(),
    })
  }

  sendReadStatus(conversationId: string, messageIds: string[]) {
    this.send({
      type: 'read',
      data: {
        conversationId,
        messageIds,
      },
      timestamp: new Date().toISOString(),
    })
  }

  // 事件监听系统
  on(event: string, callback: (data?: unknown) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event: string, callback: (data?: unknown) => void) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
    }
  }

  private emit(event: string, data?: unknown) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data))
    }
  }

  // 兼容旧版本的消息监听器
  onMessage(callback: (message: WebSocketMessage) => void) {
    this.on('message', data => {
      if (data && typeof data === 'object' && 'type' in data) {
        callback(data as WebSocketMessage)
      }
    })
  }

  // 获取连接状态
  get readyState() {
    return this.ws?.readyState || WebSocket.CLOSED
  }

  // 检查是否已连接
  get isConnected() {
    return this.ws?.readyState === WebSocket.OPEN
  }

  // 关闭连接
  disconnect() {
    this.stopHeartbeat()
    if (this.ws) {
      this.ws.close(1000, '主动断开连接') // 1000 表示正常关闭
      this.ws = null
    }
    this.listeners = {} // 清空监听器
  }
}

// 创建单例 - 保持兼容
export const wsService = new WebSocketService(import.meta.env.VITE_WS_URL || 'ws://localhost:3001')
