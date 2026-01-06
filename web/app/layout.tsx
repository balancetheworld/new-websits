import type { Metadata } from 'next'
import type React from 'react'
import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/contexts/theme-context'
import './globals.css'
// import "/iconfont/iconfont.css"

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YunJing\' website',
  description: 'Welcome to my personal portfolio website',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/Logo.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/Logo.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/Logo.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
