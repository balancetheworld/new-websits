import { FaCss3, FaGitAlt, FaHtml5, FaReact, FaSass } from 'react-icons/fa'
import { SiNodedotjs, SiTailwindcss, SiTypescript } from 'react-icons/si'
import './skill.scss'

function Skill() {
  const SkillList = [
    { name: 'HTML5', icon: FaHtml5, percentage: '5%' },
    { name: 'CSS3', icon: FaCss3, percentage: '10%' },
    { name: 'TypeScript', icon: SiTypescript, percentage: '50%' },
    { name: 'React', icon: FaReact, percentage: '10%' },
    { name: 'Node.js', icon: SiNodedotjs, percentage: '20%' },
    { name: 'TailWind', icon: SiTailwindcss, percentage: '60%' },
    { name: 'Git', icon: FaGitAlt, percentage: '15%' },
    { name: 'Sass', icon: FaSass, percentage: '10%' },
  ]

  return (
    <div className="relative w-[75%] h-110 bg-card rounded-4xl p-6 border-2 border-primary ">
      <div className="font-custom absolute top-6 left-8 text-3xl md:text-4xl font-bold font-mono text-foreground">
        My Skills
      </div>

      <div className="font-custom absolute top-[12%] left-8 text-base md:text-lg font-mono text-muted-foreground mt-5">
        Existing skills are continuously being refined...
        <br />
        New skills are continuously being updated...
      </div>

      <div className="absolute top-[32%] left-4 w-[90%] h-[60%] flex flex-wrap justify-around items-start">
        {SkillList.map((item, index) => {
          const IconComponent = item.icon
          return (
            <div
              key={index}
              className="w-[18%] h-[45%] m-2.5 bg-card border-2 border-primary rounded-xl flex flex-col items-center justify-center relative transition-all duration-300 hover:bg-secondary hover:text-card skillBox-item"
            >
              <IconComponent size={35} className=" text-primary " />

              <div className="font-custom absolute top-2 w-full h-[25%] bg-muted-foreground/70 rounded-md opacity-0 transition-all duration-800 skillBox-item-text">
                <div className="absolute top-1/2 left-1/2 text-sm font-bold text-background -translate-x-1/2 -translate-y-1/2">
                  {item.name}
                </div>
                <div className="absolute bottom-[15%] left-[5%] w-[90%] h-[8%] bg-background/80 rounded-sm">
                  <div
                    className="h-full bg-primary rounded-sm"
                    style={{ width: item.percentage }}
                  >
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Skill
