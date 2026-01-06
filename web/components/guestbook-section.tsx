'use client'

import type React from 'react'

import { Send } from 'lucide-react'
import { useState } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface Message {
  id: number
  name: string
  content: string
  timestamp: string
}

export default function GuestbookSection() {
  const { ref, isVisible } = useScrollAnimation()

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: 'Alice',
      content: 'Great portfolio! Love your design sense.',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      name: 'Bob',
      content: 'Impressive projects. Would love to collaborate!',
      timestamp: '1 day ago',
    },
  ])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim())
      return

    const newMessage: Message = {
      id: Math.max(...messages.map(m => m.id), 0) + 1,
      name,
      content,
      timestamp: 'just now',
    }

    setMessages([newMessage, ...messages])
    setName('')
    setContent('')
  }

  return (
    <section
      ref={ref}
      id="guestbook"
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 mb-24 md:mb-0 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex w-full items-center justify-center mb-18">
          <div className="flex-1 h-[0.15rem] bg-primary rounded-full max-w-[80px] sm:max-w-[100px]"></div>
          <h2 className="text-3xl sm:text-4xl inline-block md:text-5xl font-bold  font-custom mx-5 sm:mx-6 md:mx-10">Message Board</h2>
          <div className="flex-1 h-[0.15rem] bg-primary rounded-full max-w-[80px] sm:max-w-[100px]"></div>
        </div>

        {/* 留言表单 */}
        <form
          onSubmit={handleSubmit}
          className={`mb-8 sm:mb-12 p-4 sm:p-6 bg-muted/50 rounded-2xl border border-border transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full mb-4 px-3 sm:px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
          />
          <textarea
            placeholder="Write your message..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={4}
            className="w-full mb-4 px-3 sm:px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm sm:text-base"
          />
          <button
            type="submit"
            className="w-full px-4 sm:px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </form>

        {/* 留言列表 */}
        <div className="space-y-3 sm:space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`p-4 sm:p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${300 + index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <h3 className="font-bold text-base sm:text-lg">{message.name}</h3>
                <span className="text-xs sm:text-sm text-muted-foreground">{message.timestamp}</span>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{message.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
