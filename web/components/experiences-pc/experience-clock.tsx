'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

// 定义类型接口，增强类型安全
interface ExperienceItem {
  time: string
  name: string
  introduce: string
}

function Experience() {
  // 1. 先定义数据
  const EXList = useMemo<ExperienceItem[]>(() => [
    {
      time: '11-45-14',
      name: '成为小狗算经历吗',
      introduce: '成为单身狗算经历吗',
    },
    {
      time: '12-14-01',
      name: '成为小猫算经历吗',
      introduce: '不能变成猫娘怎么办',
    },
    {
      time: '2025-10-20',
      name: '和喜欢的人在一起算经历吗',
      introduce: '我愿意做你的主人我愿意做你的主人我愿意做你的主人',
    },
    {
      time: '11-11-11',
      name: '怎么还有呀',
      introduce: '我编不出来惹',
    },
    {
      time: '2026-01-01',
      name: '没有经历呜呜呜',
      introduce: '没有公司要我呜呜呜',
    },
    {
      time: '2026-05-01',
      name: '我会努力的呜呜',
      introduce: '给我一个机会呜呜呜',
    },
  ], [])

  // 2. 定义状态和Ref
  const [offset, setOffset] = useState(0)
  const maxOffset = 0
  const minOffset = -(EXList.length - 1)
  const clockRef = useRef<HTMLDivElement>(null)
  const cardWrapperRef = useRef<HTMLDivElement>(null)

  // 3. 先定义函数（关键修复：移到useEffect之前）
  /**
   * 添加普通时钟刻度
   * @param clock 时钟容器DOM元素
   * @param degree 旋转角度
   */
  const addClockScale = (clock: HTMLDivElement, degree: number) => {
    const invisibleTable = document.createElement('div')
    // Tailwind 样式替代原 className
    invisibleTable.className = 'absolute w-full h-full rounded-full transform-origin-center'
    invisibleTable.style.transform = `rotate(${degree}deg)`

    const scale = document.createElement('div')
    // 使用 global.css 中的 CSS 变量 + Tailwind
    scale.className = 'rounded-r-xl absolute top-[calc(50%-0.5px)] left-[-6px] w-[4%] h-[2.5px] bg-[var(--color-chart-2)]'

    invisibleTable.appendChild(scale)
    clock.appendChild(invisibleTable)
  }

  /**
   * 添加带年份的粗刻度
   * @param clock 时钟容器DOM元素
   * @param degree 旋转角度
   * @param time 年份文本
   */
  const addThickClockScale = (clock: HTMLDivElement, degree: number, time: number) => {
    const invisibleTable = document.createElement('div')
    invisibleTable.className = 'absolute w-full h-full rounded-full transform-origin-center'
    invisibleTable.style.transform = `rotate(${degree}deg)`

    const thickScale = document.createElement('div')
    thickScale.className = 'rounded-r-lg absolute top-[calc(50%-3px)] left-[-6px] w-[8%] h-[5px] bg-[var(--color-chart-1)]'

    const text = document.createElement('span')
    text.className = 'font-custom absolute left-[140%] top-[calc(50%-30px)] text-[40px] text-[var(--color-chart-1)] font-bold'
    text.textContent = `${time}`
    thickScale.appendChild(text)

    invisibleTable.appendChild(thickScale)
    clock.appendChild(invisibleTable)
  }

  // 4. 再定义使用函数的 useEffect（此时函数已定义）
  useEffect(() => {
    const clock = clockRef.current
    if (!clock)
      return

    clock.innerHTML = '' // 清空时钟表盘

    // 遍历创建主刻度
    EXList.forEach((item, index) => {
      const degree = index * 60
      addClockScale(clock, degree) // 现在函数已定义，无报错
      const year = Number.parseInt(item.time.split('-')[0])
      addThickClockScale(clock, degree, year)
    })

    // 添加额外刻度（每10度）
    for (let i = 10; i < 360; i += 10) {
      if (!EXList.some((_, idx) => idx * 60 === i)) {
        addClockScale(clock, i)
      }
    }
  }, [EXList])

  // 5. 其他函数定义
  // 向上切换卡片
  const slideToPrev = () => {
    setOffset(prev => Math.min(maxOffset, prev + 1))
  }

  // 向下切换卡片
  const slideToNext = () => {
    setOffset(prev => Math.max(minOffset, prev - 1))
  }

  // 旋转时钟表盘
  const clockRotate = (degree: number) => {
    if (clockRef.current) {
      clockRef.current.style.transform = `rotate(${degree}deg)`
    }
  }

  // 偏移量变化时更新卡片和时钟
  useEffect(() => {
    // 修复：只操作外层容器，避免双重偏移
    if (cardWrapperRef.current) {
      cardWrapperRef.current.style.transform = `translateY(${offset * 100}%)`
    }
    clockRotate(offset * 60)
  }, [offset])

  // 计算箭头的禁用状态
  const isAtFirst = offset === maxOffset
  const isAtLast = offset === minOffset

  // 渲染卡片列表
  const showEXList = () => {
    return EXList.map((item, index) => (
      <div
        key={index}
        // 修复：移除单个卡片的translateY，统一由外层容器控制
        className="experience-card w-full h-full flex flex-col justify-center text-foreground break-words px-6 "
      >
        {/* 修复：调整字体大小，适配响应式，避免过小 */}
        <div className="font-custom text-[clamp(16px,1.5vw,22px)] max-text- font-bold font-mono mb-1">{item.time}</div>
        <div className="font-custom text-[clamp(16px,2vw,30px)] pb-1 border-b border-border mb-2 font-semibold font-mono">{item.name}</div>
        <div className=" font-custom text-[clamp(16px,1.8vw,20px)] font-medium font-mono mb-2">{item.introduce}</div>
      </div>
    ))
  }
  // 6. 渲染JSX
  return (
    <div className="relative w-[75%] h-110 bg-card rounded-[2.5rem] p-6 border-2 border-primary overflow-hidden">
      {/* 向上按钮 - 使用 global.css 变量 + 交互样式 */}
      <FaChevronUp
        size={60}
        className={`absolute top-[10%] left-[18%] z-50 transition-colors duration-300 ${
          isAtFirst
            ? 'text-[var(--color-muted)] cursor-not-allowed'
            : 'text-[var(--color-foreground)] hover:text-[var(--color-primary)] cursor-pointer'
        }`}
        onClick={isAtFirst ? undefined : slideToPrev}
      />
      {/* 向下按钮 */}
      <FaChevronDown
        size={60}
        className={`absolute bottom-[10%] left-[18%] z-50 transition-colors duration-300 ${
          isAtLast
            ? 'text-[var(--color-muted)] cursor-not-allowed'
            : 'text-[var(--color-foreground)] hover:text-[var(--color-primary)] cursor-pointer'
        }`}
        onClick={isAtLast ? undefined : slideToNext}
      />

      {/* 卡片内容容器 */}
      <div className="absolute left-[9%] w-[30%] h-full overflow-hidden rounded-lg ">
        <div
          ref={cardWrapperRef}
          className="experience-wrapper w-full h-full transition-transform duration-800 ease-in-out"
        >
          {showEXList()}
        </div>
      </div>

      {/* 时钟容器 - 使用 global.css 变量 */}
      <div className="absolute right-[-32%] top-[-25%] h-[130%] aspect-square rounded-full bg-background border-[10px] border-[var(--color-primary)]">
        <div
          ref={clockRef}
          className="absolute top-[2%] left-[2%] w-[96%] h-[96%] rounded-full transition-transform duration-800 ease-in-out"
        >
        </div>
      </div>
    </div>
  )
}

export default Experience
