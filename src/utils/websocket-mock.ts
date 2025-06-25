export class MockWebSocketService {
  private listeners: { [key: string]: Function[] } = {}
  private isConnected = false
  private heartbeatTimer: number | null = null
  private mockUserId = 999 // 模拟对方用户ID

  constructor() {
    // 模拟连接延迟
    setTimeout(() => {
      this.isConnected = true
      this.emit('connected')
      this.startHeartbeat()
      console.log('Mock WebSocket 连接成功')
    }, 1000)
  }

  connect(token: string) {
    console.log('模拟 WebSocket 连接...', token)
    return this
  }

  send(message: any) {
    if (!this.isConnected) {
      console.error('Mock WebSocket 未连接')
      return
    }

    console.log('发送消息:', message)

    // 根据消息类型进行不同的处理
    switch (message.type) {
      case 'send_message':
        this.handleSendMessage(message)
        break
      case 'typing_status':
        this.handleTypingStatus(message)
        break
      case 'read_status':
        this.handleReadStatus(message)
        break
      case 'ping':
        this.emit('pong')
        break
    }
  }

  private handleSendMessage(message: any) {
    const { data } = message

    // 立即发送确认
    setTimeout(() => {
      this.emit('message_sent', {
        message: {
          id: `msg_${Date.now()}`,
          conversationId: data.conversationId,
          senderId: data.senderId || 1,
          receiverId: data.receiverId,
          type: data.type,
          content: data.content,
          fileInfo: data.fileInfo,
          status: 'sent',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        tempId: data.tempId,
      })
    }, 300)

    // 模拟自动回复（50%概率）
    if (Math.random() < 0.5) {
      this.sendAutoReply(data.conversationId, data.content)
    }
  }

  private sendAutoReply(conversationId: string, originalContent: string) {
    const replies = [
      '收到你的消息了！',
      '好的，我明白了',
      '这个想法很有趣',
      '谢谢分享',
      '让我想想...',
      '👍 赞同',
      '😊',
      '有时间详细讨论一下',
      '我也是这么想的',
      '确实如此',
    ]

    // 智能回复逻辑
    let reply = replies[Math.floor(Math.random() * replies.length)]

    if (originalContent.includes('你好') || originalContent.includes('hi')) {
      reply = '你好！很高兴认识你'
    } else if (originalContent.includes('谢谢') || originalContent.includes('感谢')) {
      reply = '不客气！'
    } else if (originalContent.includes('?') || originalContent.includes('？')) {
      reply = '这是个好问题，让我想想...'
    }

    // 延迟回复（模拟真实用户）
    setTimeout(
      () => {
        // 先发送正在输入状态
        this.emit('typing_status', {
          userId: this.mockUserId,
          conversationId,
          isTyping: true,
        })

        // 再发送消息
        setTimeout(
          () => {
            this.emit('typing_status', {
              userId: this.mockUserId,
              conversationId,
              isTyping: false,
            })

            this.emit('new_message', {
              message: {
                id: `reply_${Date.now()}`,
                conversationId,
                senderId: this.mockUserId,
                receiverId: 1,
                type: 'text',
                content: reply,
                status: 'sent',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            })
          },
          1000 + Math.random() * 2000
        ) // 1-3秒打字时间
      },
      500 + Math.random() * 1500
    ) // 0.5-2秒反应时间
  }

  private handleTypingStatus(message: any) {
    // 模拟对方也在输入（10%概率）
    if (Math.random() < 0.1) {
      setTimeout(() => {
        this.emit('typing_status', {
          userId: this.mockUserId,
          conversationId: message.data.conversationId,
          isTyping: true,
        })

        setTimeout(() => {
          this.emit('typing_status', {
            userId: this.mockUserId,
            conversationId: message.data.conversationId,
            isTyping: false,
          })
        }, 2000)
      }, 1000)
    }
  }

  private handleReadStatus(message: any) {
    // 模拟已读确认
    setTimeout(() => {
      this.emit('read_status', {
        conversationId: message.data.conversationId,
        messageIds: message.data.messageIds,
        readBy: this.mockUserId,
      })
    }, 500)
  }

  private startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      this.emit('pong')
    }, 30000) as unknown as number
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  // 模拟随机事件
  private startRandomEvents() {
    // 随机在线状态变化
    setInterval(() => {
      this.emit('user_status', {
        userId: this.mockUserId,
        isOnline: Math.random() > 0.3,
        lastSeen: new Date().toISOString(),
      })
    }, 60000) // 每分钟随机变化

    // 随机接收消息（很低概率）
    setInterval(() => {
      if (Math.random() < 0.05) {
        // 5%概率
        const randomMessages = [
          '在吗？',
          '最近怎么样？',
          '有个问题想请教你',
          '分享一个有趣的发现',
          '😊',
          '晚安',
        ]

        const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)]

        this.emit('new_message', {
          message: {
            id: `random_${Date.now()}`,
            conversationId: 'random_conv',
            senderId: this.mockUserId,
            receiverId: 1,
            type: 'text',
            content: randomMessage,
            status: 'sent',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        })
      }
    }, 30000) // 每30秒检查一次
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event: string, callback: Function) {
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
    return this.isConnected ? 1 : 0 // WebSocket.OPEN : WebSocket.CONNECTING
  }

  get isOpen() {
    return this.isConnected
  }

  disconnect() {
    this.isConnected = false
    this.stopHeartbeat()
    this.emit('disconnected')
    console.log('Mock WebSocket 断开连接')
  }
}

// 创建单例
export const mockWS = new MockWebSocketService()
