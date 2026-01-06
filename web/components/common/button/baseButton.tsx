'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React from 'react'

type ButtonAction
  = | { type: 'link', href: string } // 内部跳转
    | { type: 'external', url: string } // 外部跳转（如 GitHub）
    | { type: 'callback', onClick: () => void } // 自定义点击方法
    | { type: 'submitComment', onSubmit: () => void } // 提交评论（可扩展）
    | { type: 'verify', onVerify: () => void } // 验证按钮（可扩展）

interface Props {
  action: ButtonAction
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

export default function Button({
  action,
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
}: Props) {
  const router = useRouter()

  const handleClick = () => {
    if (disabled || loading)
      return

    switch (action.type) {
      case 'link':
        router.push(action.href)
        break
      case 'external':
        window.open(action.url, '_blank')
        break
      case 'callback':
        action.onClick()
        break
      case 'submitComment':
        action.onSubmit()
        break
      case 'verify':
        action.onVerify()
        break
    }
  }

  const baseStyles
    = 'inline-flex items-center justify-center rounded-xl border-[1.8]  font-custom font-bold transition-all'

  const variantStyles = {
    primary: ' text-primary border-solid border-primary  ',
    secondary: 'bg-gray-200 text-gray-800 ',
    ghost: 'bg-primary text-card ',
  }

  const sizeStyles = {
    sm: 'px-3 py-1 ',
    md: 'px-1.5 py-1.5',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {loading ? '加载中...' : children}
    </button>
  )
}
