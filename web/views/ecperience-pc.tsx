'use client'
import Image from 'next/image'
import { useState } from 'react'
import Experience from '@/components/experiences-pc/experience-clock'
import ExperienceNavigation from '@/components/experiences-pc/navigaton'
import SkillPart from '@/components/experiences-pc/skill/skill'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [activeSection, setActiveSection] = useState('')

  const renderContent = () => {
    switch (activeSection) {
      case 'skill':
        return <SkillPart />
      default:
        return <Experience />
    }
  }

  return (
    <section
      ref={ref}
      id="experience"
      className={`min-h-screen flex items-center justify-center px-4  md:px-8 py-16 mb-24 md:mb-0 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto w-full">
        <div

          className={`${isVisible ? 'components-animate-shake opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
        >
          <div className="flex w-full items-center justify-center mb-18">
            <div className="flex-1 h-[0.15rem] bg-primary rounded-full max-w-[80px] sm:max-w-[100px]"></div>
            <h2 className="text-3xl sm:text-4xl inline-block md:text-5xl font-bold  font-custom mx-5 sm:mx-6 md:mx-10">Experience</h2>
            <div className="flex-1 h-[0.15rem] bg-primary rounded-full max-w-[80px] sm:max-w-[100px]"></div>
          </div>
        </div>
        {/* 导航栏 */}
        <div className="flex relative justify-between gap-y-10">
          <ExperienceNavigation onSelect={setActiveSection} />
          <div className="absolute bottom-[-5] left-[-1] w-[150px] h-[225px] md:w-[210px] md:h-[300px]">
            <Image
              src="/images/clock.png"
              alt="homeye"
              width={320}
              height={320}
            />
          </div>
          {renderContent()}
        </div>
      </div>

    </section>
  )
}
