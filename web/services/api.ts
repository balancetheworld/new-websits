import process from 'node:process'
// API 基础配置
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// 通用消息接口
interface Message {
  id: number
  name: string
  content: string
  timestamp: string
  likes?: number
  dislikes?: number
  love?: number
}

// API 响应接口
interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

/**
 * 留言板 API 服务
 */
export const messageApi = {
  /**
   * 获取所有留言
   */
  async getAllMessages(): Promise<Message[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages`)
      const result: ApiResponse<Message[]> = await response.json()

      if (result.success && result.data) {
        return result.data
      }

      return []
    }
    catch (error) {
      console.error('获取留言失败:', error)
      return []
    }
  },

  /**
   * 创建新留言
   */
  async createMessage(name: string, content: string): Promise<Message | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          content: content.trim(),
        }),
      })

      const result: ApiResponse<Message> = await response.json()

      if (result.success && result.data) {
        return result.data
      }

      console.error('创建留言失败:', result.error)
      return null
    }
    catch (error) {
      console.error('创建留言失败:', error)
      return null
    }
  },

  /**
   * 点赞
   */
  async likeMessage(id: number): Promise<Message | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages/${id}/like`, {
        method: 'POST',
      })
      const result: ApiResponse<Message> = await response.json()

      if (result.success && result.data) {
        return result.data
      }

      return null
    }
    catch (error) {
      console.error('点赞失败:', error)
      return null
    }
  },

  /**
   * 点踩
   */
  async dislikeMessage(id: number): Promise<Message | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages/${id}/dislike`, {
        method: 'POST',
      })
      const result: ApiResponse<Message> = await response.json()

      if (result.success && result.data) {
        return result.data
      }

      return null
    }
    catch (error) {
      console.error('点踩失败:', error)
      return null
    }
  },

  /**
   * 爱心
   */
  async loveMessage(id: number): Promise<Message | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages/${id}/love`, {
        method: 'POST',
      })
      const result: ApiResponse<Message> = await response.json()

      if (result.success && result.data) {
        return result.data
      }

      return null
    }
    catch (error) {
      console.error('爱心失败:', error)
      return null
    }
  },
}

// 导出类型
export type { ApiResponse, Message }
