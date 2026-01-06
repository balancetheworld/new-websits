import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export default function HomeSection() {
  const { ref, isVisible } = useScrollAnimation()

  function splitName(str: string) {
    return [...str]
  }

  const sayHi = 'Hi, I\'m'
  const sayName = 'Caitria'
  return (
    <>
      <section
        ref={ref}
        id="homePage"
        className={`min-h-screen relative flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-12 text-center pb-24 md:pb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto w-full">
          {/* 名字和签名 */}
          <h1
            className={` text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 text-balance leading-tight transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span>
              {splitName(sayHi).map((item, index) => (
                <span
                  key={index}
                  className="inline-block transition-all duration-500 ease-in-out
               font-custom
    bg-[var(--primary)] bg-clip-text text-transparent
    hover:bg-[var(--accent)] bg-clip-text text-transparent
    hover:-translate-y-[7px]"
                >
                  {item}
                </span>
              ))}
              <span className="mr-18 pr-7 hidden md:inline-block"></span>
              {splitName(sayName).map((item, index) => (
                <span
                  key={index}
                  className="inline-block transition-all duration-500 ease-in-out
               font-custom
    bg-[var(--primary)] bg-clip-text text-transparent
    hover:bg-[var(--accent)] bg-clip-text text-transparent
    hover:-translate-y-[7px]"
                >
                  {item}
                </span>
              ))}
            </span>
          </h1>
          <pre
            className={`font-custom text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 text-balance leading-relaxed px-2 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="block sm:hidden"> young and free will climb the hill </span>
            <span className="hidden md:block"> young and free                           will climb the hill</span>
          </pre>
        </div>
        <div className="absolute ml-[-5px] hidden md:block">
          <Image
            src="/images/home.png"
            alt="homeye"
            width={200}
            height={300}
            priority={false}
          />
        </div>
      </section>
    </>

  )
}
