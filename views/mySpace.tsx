'use client'

import { Heart, Lock } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export default function CoupleSpaceSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [inputPassword, setInputPassword] = useState('')

  const correctPassword = '20051214'

  const handleUnlock = () => {
    if (inputPassword === correctPassword) {
      setIsUnlocked(true)
      setInputPassword('')
    }
    else {
      alert('密码错误')
      setInputPassword('')
    }
  }

  const memories = [
    {
      title: '11122222',
      date: '2023-01-15',
      description: '233333',
    },
    {
      title: '114514',
      date: '2023-06-20',
      description: 'zyjzyj',
    },
    {
      title: 'zzzzyyyjjj',
      date: '2024-02-14',
      description: 'byawwww',
    },
  ]

  return (
    <section
      ref={ref}
      id="couple-space"
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 bg-gradient-to-b from-background to-background/95 mb-24 md:mb-0 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto w-full relative">
        <div className="flex w-full items-center justify-center mb-18">
          <div className="flex-1 h-[0.15rem] bg-primary rounded-full max-w-[80px] sm:max-w-[100px]"></div>
          <h2 className="text-3xl sm:text-4xl inline-block md:text-5xl font-bold  font-custom mx-5 sm:mx-6 md:mx-10">Life & Live</h2>
          <div className="flex-1 h-[0.15rem] bg-primary rounded-full max-w-[80px] sm:max-w-[100px]"></div>
        </div>

        {!isUnlocked
          ? (
              <>
                <div
                  className={`max-w-md mx-auto bg-card p-6 sm:p-8 rounded-2xl border-2 border-primary rounded-3xl text-center transition-all duration-1000 delay-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <Lock className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl sm:text-2xl font-custom font-bold mb-2">secret nook meow~</h3>
                  <p className="text-muted-foreground text-sm font-custom sm:text-base mb-6">enter my Birthday to unlock exclusive content</p>
                  <input
                    type="password"
                    value={inputPassword}
                    onChange={e => setInputPassword(e.target.value)}
                    placeholder="enter the password"
                    onKeyPress={e => e.key === 'Enter' && handleUnlock()}
                    className="w-full px-3 sm:px-4 py-2 font-custom rounded-lg bg-background border border-border mb-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  />
                  <button
                    onClick={handleUnlock}
                    className="w-full px-4 font-custom sm:px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base"
                  >
                    Unlock
                  </button>
                </div>
                <div className=" absolute bottom-[-4] right-2 hidden md:block ">
                  <Image
                    src="/images/myspace2.png"
                    alt="meow"
                    width={180}
                    height={180}
                    priority={true}
                    className="object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                </div>
              </>
            )
          : (
              <div className="space-y-6 sm:space-y-8">
                <div
                  className={`text-center mb-6 sm:mb-8 transition-all duration-1000 delay-200 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">欢迎来到我们的空间 ❤️</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">这里记录了我们最珍贵的回忆</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {memories.map((memory, index) => (
                    <div
                      key={index}
                      className={`p-4 sm:p-6 bg-card rounded-2xl border border-border hover:border-accent/50 transition-all duration-1000 hover:shadow-lg ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                      style={{ transitionDelay: `${200 + index * 100}ms` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-accent fill-accent" />
                        <span className="text-xs sm:text-sm text-muted-foreground">{memory.date}</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold mb-2">{memory.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{memory.description}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsUnlocked(false)}
                  className="w-full px-4 sm:px-6 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors text-sm sm:text-base"
                >
                  Lock
                </button>
              </div>
            )}

      </div>
    </section>
  )
}
