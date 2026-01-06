'use client'
import { useState } from 'react'
import Button from '@/components/common/button/baseButton'

interface EXnavPartProps {
  onSelect: (link: string) => void
}

function ExperienceNavigation({ onSelect }: EXnavPartProps) {
  const EXnavList = [
    { name: 'Experience', link: '' },
    { name: 'Skills', link: 'skill' },
  ]

  const [activeLink, setActiveLink] = useState('')

  const handleNavClick = (link: string) => {
    setActiveLink(link)
    onSelect(link)
  }

  return (
    <div className=" ml-6  w-[17%] flex flex-col items-start gap-3">
      {EXnavList.map(item => (
        <Button
          key={item.link}
          action={{
            type: 'callback',
            onClick: () => handleNavClick(item.link),
          }}
          variant={activeLink === item.link ? 'ghost' : 'primary'}
          className="w-full  h-14 my-3 !rounded-2xl font-semibold
            transition-all duration-300"
          disabled={false}
          loading={false}
        >
          {item.name}
        </Button>
      ))}
    </div>
  )
}

export default ExperienceNavigation
