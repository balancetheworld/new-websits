'use client'

import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation()

  const experiences = [
    {
      title: 'Senior Developer',
      company: 'Tech Company',
      period: '2023 - Present',
      description: 'Leading frontend development and mentoring junior developers',
    },
    {
      title: 'Full Stack Engineer',
      company: 'Startup',
      period: '2021 - 2023',
      description: 'Built scalable web applications and managed databases',
    },
    {
      title: 'Junior Developer',
      company: 'Digital Agency',
      period: '2020 - 2021',
      description: 'Started my career building responsive websites and web applications',
    },
  ]

  return (
    <section
      ref={ref}
      id="experience"
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 mb-24 md:mb-0 transition-all duration-1000 ${
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

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative pl-6 sm:pl-8 pb-6 sm:pb-8 transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : `opacity-0 ${index % 2 === 0 ? '-translate-x-10' : 'translate-x-10'}`
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* 时间线 */}
              <div className="absolute left-[1px] sm:left-[1px] top-1 sm:top-2 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-primary rounded-full border-2 border-background"></div>
              {index < experiences.length && (
                <div className="absolute left-[4px] sm:left-[5px] top-5 sm:top-6 w-0.5 h-20 bg-primary/30 rounded-xl"></div>
              )}

              <h3 className="font-custom text-xl sm:text-2xl font-bold mb-1">{exp.title}</h3>
              <p className="font-custom text-primary font-medium text-sm sm:text-base mb-1">{exp.company}</p>
              <p className=" font-custom text-muted-foreground text-xs sm:text-sm mb-3">{exp.period}</p>
              <p className="font-custom text-muted-foreground text-sm sm:text-base leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
