'use client'

import { ChevronUp, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BiGame, BiMessageDetail } from 'react-icons/bi'
import { LuSparkles } from 'react-icons/lu'
import { RiHomeLine } from 'react-icons/ri'
import { useTheme } from '@/contexts/theme-context'

// 引入外部动画样式文件（路径根据你的实际目录调整）
import '@/components/animations/shakeAnimation.css'

interface NavigationBarProps {
  activeSection: string
}

const navItems = [
  { id: 'homePage', label: 'HOME', label_cn: '首页', icon: RiHomeLine },
  { id: 'about', label: 'ABOUT', label_cn: '关于', icon: AiOutlineUser },
  { id: 'experience', label: 'EXPERIENCE', label_cn: '经历', icon: LuSparkles },
  { id: 'guestbook', label: 'GUESTBOOK', label_cn: '留言', icon: BiMessageDetail },
  { id: 'couple-space', label: 'More', label_cn: '更多', icon: BiGame },
]

export default function NavigationBar({ activeSection }: NavigationBarProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  if (isMobile && isMenuOpen) {
    return (
      <>
        {/* 移动端展开菜单 */}
        <nav className="fixed bottom-0 left-0 right-0 z-[99999] z-50 bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 pb-safe">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">菜单</span>
            <div className="flex gap-2">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 hover:bg-muted rounded-lg transition-colors transition-all duration-300 hover:-translate-y-[7px]"
                  aria-label="切换主题"
                >
                  {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
              )}
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleScroll(item.id)}
                  className={`flex flex-col items-center justify-center px-3 py-4 rounded-lg  transition-all duration-300 hover:-translate-y-[7px] ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-accent hover:text-foreground hover:bg-muted'
                  }`}
                  title={item.label_cn}
                >
                  <Icon className="w-6 h-6 " />
                </button>
              )
            })}
          </div>
        </nav>
      </>
    )
  }

  return (
    <>
      {/* 桌面端导航栏 */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-background/95 backdrop-blur-md  rounded-2xl px-4 py-3 shadow-[0_0_12px_rgba(0,0,0,0.08)] flex gap-4 items-center justify-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg hidden md:flex ">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`p-3 rounded-2xl transition-all duration-300  shadow-[0_0_12px_rgba(0,0,0,0.1)] hover:-translate-y-[7px] hover-animate-shake ${
                activeSection === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-accent hover:text-foreground hover:bg-muted'
              }`}
              title={item.label_cn}
            >
              <Icon className="w-6 h-6 transition-all " />
            </button>
          )
        })}
        {mounted && (
          <div className="ml-2 pl-2 border-l border-border">
            <button
              onClick={toggleTheme}
              className="p-3 text-accent hover:text-foreground hover:bg-muted rounded-2xl transition-all duration-300 shadow-[0_0_12px_rgba(0,0,0,0.1)] hover:-translate-y-[7px] hover-animate-shake"
              aria-label="切换主题"
              title={theme === 'light' ? '深色模式' : '浅色模式'}
            >
              {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        )}
      </nav>

      {/* 移动端底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 pb-safe md:hidden flex items-center justify-between">
        <button onClick={() => setIsMenuOpen(true)} className="p-3 hover:bg-muted rounded-lg transition-colors transition-all duration-300 hover:-translate-y-[7px]">
          <Menu className="w-5 h-5 " />
        </button>
        <div className="flex gap-2 flex-1 overflow-x-auto justify-center">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`p-3 rounded-lg transition-all duration-300 flex-shrink-0 ${
                  activeSection === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-accent hover:text-foreground hover:bg-muted'
                }`}
                title={item.label_cn}
              >
                <Icon className="w-5 h-5" />
              </button>
            )
          })}
        </div>
        {mounted && (
          <button
            onClick={toggleTheme}
            className="p-3 hover:bg-muted rounded-lg transition-colors ml-2 transition-all duration-300 hover:-translate-y-[7px]"
            aria-label="切换主题"
          >
            {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* 返回顶部按钮 */}
      <button
        onClick={() => handleScroll('hero')}
        className="fixed bottom-24 right-4 md:bottom-32 md:right-6 z-40 bg-primary text-primary-foreground p-2.5 md:p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110"
        title="回到顶部"
      >
        <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </>
  )
}
