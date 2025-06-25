import type { WebSocketMessage } from '@/api/types/notification'

export class WebSocketService {
  private ws: WebSocket | null = null
  private readonly url: string
  private reconnectAttempts = 0
  private readonly maxReconnectAttempts = 5
  private reconnectTimeout: number = 1000

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
      }

      this.ws.onclose = () => {
        console.log('WebSocket 连接关闭')
        this.reconnect(userId)
      }

      this.ws.onerror = error => {
        console.error('WebSocket 错误:', error)
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
    }
  }

  // 添加消息监听器
  onMessage(callback: (message: WebSocketMessage) => void) {
    if (this.ws) {
      this.ws.onmessage = event => {
        try {
          const message = JSON.parse(event.data) as WebSocketMessage
          callback(message)
        } catch (error) {
          console.error('解析消息失败:', error)
        }
      }
    }
  }

  // 关闭连接
  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

// 创建单例
export const wsService = new WebSocketService('ws://10.251.254.129:8081/ws')
