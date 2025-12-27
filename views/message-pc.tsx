'use client'

import type React from 'react'
import { Heart, Send, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import { TbGhost2 } from 'react-icons/tb'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import './message-pc.scss'

interface Message {
  id: number
  name: string
  content: string
  timestamp: string
  likes: number
  dislikes: number
  love: number
}

export default function GuestbookSection() {
  const { ref, isVisible } = useScrollAnimation()

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: 'Mob',
      content: '正在努力开发服务端中...',
      timestamp: '2 hours ago',
      likes: 3,
      dislikes: 0,
      love: 5,
    },
    {
      id: 2,
      name: 'JoJo',
      content: '有什么建议和意见都可以私信告诉我哦，十分感谢！',
      timestamp: '1 day ago',
      likes: 1,
      dislikes: 0,
      love: 2,
    },
  ])

  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  /** 点击点赞 */
  const handleLike = (id: number) => {
    setMessages(prev =>
      prev.map(msg => msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg),
    )
  }

  /** 点击点踩 */
  const handleDislike = (id: number) => {
    setMessages(prev =>
      prev.map(msg => msg.id === id ? { ...msg, dislikes: msg.dislikes + 1 } : msg),
    )
  }

  /** 点击点踩 */
  const handleLove = (id: number) => {
    setMessages(prev =>
      prev.map(msg => msg.id === id ? { ...msg, love: msg.love + 1 } : msg),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !content.trim())
      return

    const newMessage: Message = {
      id: Math.max(...messages.map(m => m.id), 0) + 1,
      name,
      content,
      timestamp: 'just now',
      likes: 0,
      dislikes: 0,
      love: 0,
    }

    setMessages([newMessage, ...messages])
    setName('')
    setContent('')
  }

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
          <div className="h-full overflow-y-auto custom-scrollbar pr-2">
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
                      {message.timestamp}
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
