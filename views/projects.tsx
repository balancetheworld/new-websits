'use client'

import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export default function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation()

  const projects = [
    {
      title: 'Project One',
      description: 'A beautiful web application with modern design and smooth animations',
      tags: ['React', 'TypeScript', 'Tailwind'],
      image: '/images/111.png',
    },
    {
      title: 'Project Two',
      description: 'Full-stack application with real-time features and database integration',
      tags: ['Next.js', 'Prisma', 'PostgreSQL'],
      image: '/images/222.png',
    },
    {
      title: 'Project Three',
      description: 'Mobile-first responsive design with accessibility in mind',
      tags: ['Vue', 'Vite', 'CSS'],
      image: '/images/222.png',
    },
  ]

  return (
    <section
      ref={ref}
      id="projects"
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 mb-24 md:mb-0 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex w-full items-center justify-center mb-18">
          <div className="flex-1 h-[0.15rem] bg-primary rounded-full max-w-[80px] sm:max-w-[100px]"></div>
          <h2 className="text-3xl sm:text-4xl inline-block md:text-5xl font-bold  font-custom mx-5 sm:mx-6 md:mx-10">Project</h2>
          <div className="flex-1 h-[0.15rem] bg-primary rounded-full max-w-[80px] sm:max-w-[100px]"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group font-custom rounded-3xl overflow-hidden bg-card border border-2 border-primary border-border hover:border-primary/50 transition-all duration-1000 hover:shadow-lg hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={project.image || '/placeholder.svg'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-primary/10 text-primary px-2.5 sm:px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
