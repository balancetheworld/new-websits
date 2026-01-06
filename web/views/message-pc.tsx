'use client'

import type React from 'react'
import { Heart, Send, ThumbsUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { TbGhost2 } from 'react-icons/tb'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { messageApi, type Message } from '@/services/api'
import './message-pc.scss'

// 格式化时间显示（自动转换为本地时间）
function formatTimestamp(timestamp: string) {
  if (!timestamp)
    return ''

  try {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}`
  }
  catch {
    return timestamp
  }
}

export default function GuestbookSection() {
  const { ref, isVisible } = useScrollAnimation()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([])

  // 从后端获取留言
  const fetchMessages = async () => {
    const data = await messageApi.getAllMessages()
    setMessages(data)
  }

  // 组件挂载时获取留言
  useEffect(() => {
    fetchMessages()
  }, [])

  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  /** 点击点赞 */
  const handleLike = async (id: number) => {
    const updatedMessage = await messageApi.likeMessage(id)
    if (updatedMessage) {
      setMessages(prev =>
        prev.map(msg => msg.id === id ? updatedMessage : msg),
      )
    }
  }

  /** 点击点踩 */
  const handleDislike = async (id: number) => {
    const updatedMessage = await messageApi.dislikeMessage(id)
    if (updatedMessage) {
      setMessages(prev =>
        prev.map(msg => msg.id === id ? updatedMessage : msg),
      )
    }
  }

  /** 点击爱心 */
  const handleLove = async (id: number) => {
    const updatedMessage = await messageApi.loveMessage(id)
    if (updatedMessage) {
      setMessages(prev =>
        prev.map(msg => msg.id === id ? updatedMessage : msg),
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !content.trim())
      return

    const newMessage = await messageApi.createMessage(name.trim(), content.trim())

    if (newMessage) {
      // 立即将新消息添加到列表顶部
      setMessages(prev => [newMessage, ...prev])
      setName('')
      setContent('')
    }
    else {
      console.error('提交失败')
    }
  }

  // 阻止评论区域滚动事件冒泡到页面
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container)
      return

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = container

      // 判断是否在顶部或底部
      const isAtTop = scrollTop === 0
      const isAtBottom = scrollTop + clientHeight >= scrollHeight

      // 如果在顶部向上滚动或在底部向下滚动，阻止默认行为
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    // 使用原生事件监听器，{ passive: false } 允许 preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false } as AddEventListenerOptions)

    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <section
      ref={ref}
      id="guestbook"
      className={`min-h-screen flex-col flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 mb-24 md:mb-0 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex w-full items-center justify-center mb-18">
          <div className="flex-1 h-[0.15rem] bg-primary rounded-full max-w-[80px] sm:max-w-[100px]"></div>
          <h2 className="text-3xl sm:text-4xl inline-block md:text-5xl font-bold font-custom mx-5 sm:mx-6 md:mx-10">
            Message Board
          </h2>
          <div className="flex-1 h-[0.15rem] bg-primary rounded-full max-w-[80px] sm:max-w-[100px]"></div>
        </div>
      </div>

      <div className="w-[80%] max-w-[1000] bg-[url('/images/background.png')] bg-cover bg-center border-3 border-primary rounded-3xl h-[500px] flex justify-between gap-4 p-5">

        {/* 留言表单 */}
        <div className="w-1/3 ">
          <form
            onSubmit={handleSubmit}
            className={`mb-8 sm:mb-12 p-4 sm:p-6 bg-muted/50 h-full rounded-2xl transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <input
              type="text"
              placeholder="your name meow~"
              value={name}
              onChange={e => setName(e.target.value.slice(0, 10))}
              maxLength={10}
              className="w-full font-custom mb-4 px-3 sm:px-4 py-2 rounded-lg bg-card border
              focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            />

            <textarea
              placeholder="say whatever's on your mind meow~"
              value={content}
              onChange={e => setContent(e.target.value.slice(0, 180))}
              maxLength={100}
              rows={4}
              className="w-full font-custom mb-4 px-3 sm:px-4 py-2 rounded-lg bg-card border
              focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm sm:text-base"
            />

            <button
              type="submit"
              className="w-full font-custom px-4 sm:px-6 py-2 bg-primary text-primary-foreground rounded-lg
              font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2
              text-sm sm:text-base"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>

        {/* 留言列表 */}
        <div className="w-1/3">
          <div ref={scrollContainerRef} className="h-full overflow-y-auto custom-scrollbar pr-2">
            <div className="space-y-3 sm:space-y-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`p-4 sm:p-6 bg-card rounded-2xl border border-border
                    hover:border-primary/50 transition-all duration-1000
                    break-words whitespace-pre-wrap
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  `}
                  style={{ transitionDelay: `${300 + index * 50}ms` }}
                >
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <h3 className="font-bold font-custom text-base sm:text-lg break-all">
                      {message.name}
                    </h3>
                    <span className="text-xs sm:text-sm font-custom text-muted-foreground">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm font-custom sm:text-base leading-relaxed break-words whitespace-pre-wrap">
                    {message.content}
                  </p>

                  {/* 点赞 / 点踩 */}
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => handleLike(message.id)}
                      className="flex items-center gap-1 text-primary hover:text-primary/80"
                    >
                      <ThumbsUp size={18} />
                      {' '}
                      {message.likes}
                    </button>

                    <button
                      onClick={() => handleLove(message.id)}
                      className="flex items-center gap-1 text-muted-foreground hover:text-muted-foreground/80"
                    >
                      <Heart size={18} />
                      {' '}
                      {message.love}
                    </button>
                    <button
                      onClick={() => handleDislike(message.id)}
                      className="flex items-center gap-1 text-muted-foreground hover:text-muted-foreground/80"
                    >
                      <TbGhost2 size={18} />
                      {' '}
                      {message.dislikes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
