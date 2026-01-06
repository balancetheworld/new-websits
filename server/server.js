import process from 'node:process'

import cors from 'cors'
import express from 'express'
import { dbOperations, initDatabase } from './database.js'

const PORT = process.env.PORT || 3001

// 辅助函数：格式化时间
function formatTimestamp(timestamp) {
  const now = new Date()
  const msgDate = new Date(timestamp)
  const diffInSeconds = Math.floor((now - msgDate) / 1000)

  if (diffInSeconds < 60)
    return 'just now'
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`
  return `${Math.floor(diffInSeconds / 86400)} days ago`
}

// 辅助函数：格式化响应数据
function formatMessage(msg) {
  return {
    ...msg,
    timestamp: msg.timestamp, // 直接返回原始时间戳
  }
}

// 启动服务器
async function startServer() {
  // 初始化数据库
  await initDatabase()

  const app = express()

  // 中间件
  app.use(cors())
  app.use(express.json())

  // 获取所有留言
  app.get('/api/messages', (req, res) => {
    try {
      const messages = dbOperations.getAllMessages()
      res.json({ success: true, data: messages.map(formatMessage) })
    }
    catch (error) {
      res.status(500).json({ success: false, error: error.message })
    }
  })

  // 创建新留言
  app.post('/api/messages', (req, res) => {
    try {
      const { name, content } = req.body

      if (!name || !content) {
        return res.status(400).json({
          success: false,
          error: 'Name and content are required',
        })
      }

      if (name.length > 10) {
        return res.status(400).json({
          success: false,
          error: 'Name must be 10 characters or less',
        })
      }

      if (content.length > 100) {
        return res.status(400).json({
          success: false,
          error: 'Content must be 100 characters or less',
        })
      }

      const message = dbOperations.createMessage(name.trim(), content.trim())
      res.json({ success: true, data: formatMessage(message) })
    }
    catch (error) {
      res.status(500).json({ success: false, error: error.message })
    }
  })

  // 点赞
  app.post('/api/messages/:id/like', (req, res) => {
    try {
      const { id } = req.params
      const message = dbOperations.updateLikes(Number(id))
      if (!message) {
        return res.status(404).json({ success: false, error: 'Message not found' })
      }
      res.json({ success: true, data: formatMessage(message) })
    }
    catch (error) {
      res.status(500).json({ success: false, error: error.message })
    }
  })

  // 点踩
  app.post('/api/messages/:id/dislike', (req, res) => {
    try {
      const { id } = req.params
      const message = dbOperations.updateDislikes(Number(id))
      if (!message) {
        return res.status(404).json({ success: false, error: 'Message not found' })
      }
      res.json({ success: true, data: formatMessage(message) })
    }
    catch (error) {
      res.status(500).json({ success: false, error: error.message })
    }
  })

  // 爱心
  app.post('/api/messages/:id/love', (req, res) => {
    try {
      const { id } = req.params
      const message = dbOperations.updateLove(Number(id))
      if (!message) {
        return res.status(404).json({ success: false, error: 'Message not found' })
      }
      res.json({ success: true, data: formatMessage(message) })
    }
    catch (error) {
      res.status(500).json({ success: false, error: error.message })
    }
  })

  // 启动服务器
  app.listen(PORT, () => {
    // Server is running on http://localhost:${PORT}
  })
}

startServer()
