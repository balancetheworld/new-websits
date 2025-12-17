'use client'

import { useEffect, useRef, useState } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import './animations/post-Animation.css'

interface StickyNoteProps {
  initialText?: string
  initialPosition: { x: number | string, y: number | string }
  color: string
  children?: React.ReactNode
}

const colorMap: Record<string, string> = {
  yellow: 'rgba(233, 223, 127, 1)',
  blue: 'rgba(138, 198, 209, 1)',
  green: 'rgba(187, 222, 215, 1)',
  red: 'rgba(243, 129, 129, 1)',
  purple: 'rgba(218, 195, 250, 1)',
  orange: 'rgba(244, 233, 204, 1)',
  lightPink: 'rgba(250, 228, 217, 1)',
  Pink: 'rgba(254, 182, 185, 1)',
  lightBlue: 'rgba(0, 241, 232, 1)',
  darkBlue: 'rgba(16, 202, 199, 1)',
}

export default function StickyNote({
  initialText = '',
  initialPosition,
  color = 'yellow',
  children,
}: StickyNoteProps) {
  const noteRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const bgColor = colorMap[color] || color
  const { ref, isVisible } = useScrollAnimation()

  const convertToPx = (val: number | string, parentSize: number) => {
    if (typeof val === 'number')
      return val

    const trimmed = val.trim()

    if (trimmed.endsWith('px')) {
      return Number.parseFloat(trimmed)
    }

    if (trimmed.endsWith('%')) {
      return (Number.parseFloat(trimmed) / 100) * parentSize
    }

    if (trimmed.endsWith('vw')) {
      return (Number.parseFloat(trimmed) / 100) * window.innerWidth
    }

    if (trimmed.endsWith('vh')) {
      return (Number.parseFloat(trimmed) / 100) * window.innerHeight
    }

    return Number.parseFloat(trimmed) || 0
  }

  /** 初始化位置（必须等 DOM 真实渲染后再计算） */
  useEffect(() => {
    requestAnimationFrame(() => {
      const parent = noteRef.current?.parentElement
      if (!parent)
        return

      const rect = parent.getBoundingClientRect()

      setPosition({
        x: convertToPx(initialPosition.x, rect.width),
        y: convertToPx(initialPosition.y, rect.height),
      })
    })
  }, [])

  /** 开始拖拽 */
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)

    const rect = noteRef.current!.getBoundingClientRect()

    setDragOffset({
      x: e.pageX - (rect.left + window.scrollX),
      y: e.pageY - (rect.top + window.scrollY),
    })
  }

  /** 拖拽监听 */
  useEffect(() => {
    if (!isDragging)
      return

    const handleMove = (e: MouseEvent) => {
      setPosition({
        x: e.pageX - dragOffset.x,
        y: e.pageY - dragOffset.y,
      })
    }

    const handleUp = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [isDragging, dragOffset])

  return (
    <div
      ref={(el) => {
        noteRef.current = el
        ref.current = el
      }}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        zIndex: 999,
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: bgColor,
        boxShadow: isDragging
          ? '0 10px 10px rgba(0, 0, 0, 0.18)'
          : '0 6px 12px rgba(0, 0, 0, 0.12)',
      }}
      className={`w-[8vw] max-w-30 min-w-22 h-[8vw] max-h-30 min-h-22 p-4 flex items-center justify-center  animated-box pl-5
          ${isDragging ? 'dragging' : ''}
          ${isVisible ? 'animated-trigger' : 'animated-initial'} `}
    >
      <div className="flex items-center justify-center w-full h-full text-xl font-custom">
        {children || initialText}
      </div>
    </div>
  )
}
