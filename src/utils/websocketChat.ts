import type { WSSendMessage } from '@/api/types/chat'

export interface ChatMessage {
  type: 'send_message' | 'typing' | 'read' | 'ping'
  data: {
    conversationId: string
    content?: string
    type?: 'text' | 'image' | 'file'
    fileInfo?: {
      name: string
      size: number
      url: string
      mimeType: string
    }
    tempId?: string
    isTyping?: boolean
    messageIds?: string[]
    senderId?: number
    receiverId?: number
  }
  timestamp: string
}

export class WebSocketService {
  private ws: WebSocket | null = null
  private readonly url: string
  private reconnectAttempts = 0
  private readonly maxReconnectAttempts = 5
  private reconnectTimeout: number = 1000
  private heartbeatTimer: number | null = null
  private listeners: { [key: string]: ((data?: any) => void)[] } = {}
  private userId: string = ''

  constructor(url: string) {
    this.url = url
  }

  connect(userId: string) {
    this.userId = userId
    
    // 如果已经连接，先断开
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.disconnect()
    }
    
    try {
      console.log(`正在连接 WebSocket: ${this.url}?userId=${userId}`)
      this.ws = new WebSocket(`${this.url}?userId=${userId}`)

      this.ws.onopen = () => {
        console.log('WebSocket 连接成功')
        this.reconnectAttempts = 0
        this.reconnectTimeout = 1000
        this.startHeartbeat()
        this.emit('connected')
      }

      this.ws.onmessage = event => {
        try {
          const message = JSON.parse(event.data)
          console.log('收到 WebSocket 消息:', message)
          
          // 处理 pong 消息
          if (message.type === 'pong') {
            console.log('收到心跳响应')
            return
          }
          
          // 根据消息类型触发相应事件
          this.emit(message.type, message.data)
        } catch (error) {
          console.error('解析 WebSocket 消息失败:', error)
        }
      }

      this.ws.onclose = event => {
        console.log('WebSocket 连接关闭', event.code, event.reason)
        this.stopHeartbeat()
        this.emit('disconnected')

        // 如果不是主动关闭，尝试重连
        if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
          console.log('准备重连...')
          setTimeout(() => this.reconnect(), this.reconnectTimeout)
        }
      }

      this.ws.onerror = error => {
        console.error('WebSocket 错误:', error)
        this.emit('error', error)
      }
    } catch (error) {
      console.error('WebSocket 连接失败:', error)
      this.reconnect()
    }
  }

  private reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('WebSocket 重连次数超过限制')
      this.emit('max_reconnect_attempts')
      return
    }

    this.reconnectAttempts++
    console.log(`WebSocket 重连尝试 ${this.reconnectAttempts}/${this.maxReconnectAttempts}`)
    
    setTimeout(() => {
      this.connect(this.userId)
    }, this.reconnectTimeout)

    // 指数退避
    this.reconnectTimeout = Math.min(this.reconnectTimeout * 2, 30000)
  }

  send(message: ChatMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('发送 WebSocket 消息:', message)
      this.ws.send(JSON.stringify(message))
    } else {
      console.error('WebSocket 未连接，无法发送消息，当前状态:', this.ws?.readyState)
      throw new Error('WebSocket 连接不可用')
    }
  }

  sendTextMessage(conversationId: string, content: string, tempId: string, receiverId: number) {
    const message = {
      type: 'send_message' as const,
      data: {
        conversationId,
        content,
        type: 'text' as const,
        tempId,
        senderId: parseInt(this.userId),
        receiverId,
      },
      timestamp: new Date().toISOString(),
    }
    console.log('准备发送文本消息:', message)
    this.send(message)
  }

  sendFileMessage(conversationId: string, fileInfo: any, tempId: string, receiverId: number) {
    const message = {
      type: 'send_message' as const,
      data: {
        conversationId,
        type: fileInfo.mimeType?.startsWith('image/') ? 'image' as const : 'file' as const,
        content: fileInfo.mimeType?.startsWith('image/') ? fileInfo.fileUrl : fileInfo.fileName,
        fileInfo: {
          name: fileInfo.fileName,
          size: fileInfo.fileSize,
          url: fileInfo.fileUrl,
          mimeType: fileInfo.mimeType,
        },
        tempId,
        senderId: parseInt(this.userId),
        receiverId,
      },
      timestamp: new Date().toISOString(),
    }
    console.log('准备发送文件消息:', message)
    this.send(message)
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

  private startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        try {
          this.send({
            type: 'ping',
            data: {
              conversationId: '',
            },
            timestamp: new Date().toISOString(),
          })
        } catch (error) {
          console.error('发送心跳失败:', error)
        }
      }
    }, 30000) as unknown as number
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  on(event: string, callback: (data?: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event: string, callback: (data?: any) => void) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
    }
  }

  private emit(event: string, data?: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data))
    }
  }

  get readyState() {
    return this.ws?.readyState ?? WebSocket.CONNECTING
  }

  get isOpen() {
    return this.ws?.readyState === WebSocket.OPEN
  }

  disconnect() {
    this.stopHeartbeat()
    if (this.ws) {
      this.ws.close(1000, 'Client disconnect')
      this.ws = null
    }
    this.listeners = {} // 清空监听器
    console.log('WebSocket 主动断开连接')
  }
}

// 创建全局 WebSocket 实例
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws'
export const wsService = new WebSocketService(WS_URL)