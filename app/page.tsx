'use client'

import { useEffect, useState } from 'react'
import NavigationBar from '@/components/navigation-bar'
import StickyNoteContainer from '@/components/StickyNoteContainer'
import AboutSection from '@/views/aboutMe'
import ExperienceSection from '@/views/ecperience-pc'
import SmExperienceSection from '@/views/exprience-sm'
import HomeSection from '@/views/home'
import Message from '@/views/message-pc'
import SmMessage from '@/views/message-sm'
import CoupleSpaceSection from '@/views/mySpace'
import ProjectsSection from '@/views/projects'

export default function Home() {
  const [activeSection, setActiveSection] = useState('homePage')

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()

    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'homePage',
        'about',
        'experience',
        'guestbook',
        'couple-space',
      ]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top < window.innerHeight / 2) {
            setActiveSection(section)
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="bg-background text-foreground">
      <NavigationBar activeSection={activeSection} />
      <HomeSection />
      <AboutSection />
      {isMobile ? <SmExperienceSection /> : <ExperienceSection />}
      <ProjectsSection />
      {isMobile ? <SmMessage /> : <Message />}
      <CoupleSpaceSection />

      {!isMobile && <StickyNoteContainer />}

    </main>
  )
}
