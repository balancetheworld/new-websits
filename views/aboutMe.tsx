'use client'
import Image from 'next/image'
import { FaRegHeart } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { LuMail } from 'react-icons/lu'
import { RiQqFill } from 'react-icons/ri'
import Button from '@/components/common/button/baseButton'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import '@/components/animations/components-shakeAnimation.css'

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation()
  const { ref: titleRef, isVisible: titleIsVisible } = useScrollAnimation()
  const { ref: photoRef, isVisible: photoIsVisible } = useScrollAnimation()
  const { ref: linkRef, isVisible: linkIsVisible } = useScrollAnimation()
  const { ref: buttonRef, isVisible: button3IsVisible } = useScrollAnimation()

  return (
    <section
      ref={ref}
      id="about"
      className=" relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 mb-24 md:mb-0 transition-all duration-1000 "
    >
      <div className=" max-w-4xl mx-auto w-[46%] max-w-[680] gap-8 sm:gap-12">
        <div
          ref={titleRef}
          className={`${titleIsVisible ? 'components-animate-shake opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
        >

          {/* About文字 */}
          <div className="flex w-full items-center justify-center mb-18">
            <div className="flex-1 h-[0.15rem] bg-primary rounded-full max-w-[80px] sm:max-w-[100px]"></div>
            <h2 className="text-3xl sm:text-4xl inline-block md:text-5xl font-bold  font-custom mx-5 sm:mx-6 md:mx-10">About</h2>
            <div className="flex-1 h-[0.15rem] bg-primary rounded-full max-w-[80px] sm:max-w-[100px]"></div>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* 右边图片占位符 */}
          <div
            className={`flex items-center border-3 border-primary rounded-full overflow-hidden  md:ml-[15%]  ${
              photoIsVisible ? 'components-animate-shake translate-y-0 opacity-100 ' : 'translate-y-20 opacity-0'
            }`}
          >
            <div ref={photoRef} className="w-[18vh] h-[18vh] max-w-[160] max-h-[160] bg-chart-4 aspect-square rounded-full flex items-center  justify-center overflow-hidden">
              <Image
                src="/images/photo.png"
                alt="头像"
                fill={true}
                priority={true}
                className="object-cover"
                style={{ objectPosition: 'center' }}
              />
            </div>
          </div>
          {/* Link部分 - 与图片平行显示 */}
          <div
            ref={linkRef}
            className="transition-all justify-right mr-[10%] duration-1000 delay-400 "
          >
            <div

              className={` text-3xl font-custom font-bold mb-5 ${
                linkIsVisible ? 'components-animate-shake opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              Links
            </div>
            <div className="mt-2">
              <span
                ref={buttonRef}
              >
                <Button
                  className={`mr-2 mb-1.5 ${
                    button3IsVisible ? 'components-animate-shake opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                  action={{ type: 'external', url: 'https://github.com/balancetheworld' }}
                >
                  <FiGithub strokeWidth={2} className="h-5 w-5" />
                </Button>
              </span>
              <Button
                className={`mr-2 mb-1.5 ${
                  button3IsVisible ? 'components-animate-shake-delay-25 opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                action={{ type: 'external', url: 'https://github.com/balancetheworld' }}
              >
                <LuMail strokeWidth={2} className="h-5 w-5" />
              </Button>
              <Button
                className={`mr-2 mb-1.5 ${
                  button3IsVisible ? 'components-animate-shake-delay-50 opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                action={{ type: 'external', url: 'https://mail.qq.com/cgi-bin/frame_html?sid=nCJoFotlfB8k20wl&r=2c6af03f94dd95d55a331910b35cd4ea&lang=zh' }}
              >
                <RiQqFill strokeWidth={2} className="h-5 w-5" />
              </Button>
              <Button
                className={`mr-2  ${
                  button3IsVisible ? 'components-animate-shake-delay-75 opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                action={{ type: 'external', url: 'https://github.com/snowykami' }}
              >
                <FaRegHeart strokeWidth={2} className="h-5 w-5" />
              </Button>

            </div>
          </div>
        </div>

        {/* 介绍部分 */}
        <div
          className={`mt-7 flex flex-col transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-base md:self-end font-custom sm:text-lg md:w-[38%] text-gray-700">
            Hello! I'm Yunjing,
            <br />
            {' '}
            a sophomore majoring in Software Engineering.
            <br />
            {' '}
            A Sagittarius and ENTJ, I'm currently diving deep into front-end development!
            {' '}
            <br />
            It's wonderful to have you visit my personal website.
          </p>
        </div>
      </div>

    </section>
  )
}
