// f3zlov/animated-portfolio/animated-portfolio-864d619338c7277635686af28ce7bad9c25a93a6/app/layout.tsx

import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
    title: 'Portfolio',
    description: 'Portfolio',
    generator: 'Portfolio',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        // 1. className에 폰트 변수를 추가합니다.
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
        <head>
            {/* 2. 이 <style> 태그를 완전히 삭제합니다. */}
            {/* <style>{`
            html {
              font-family: ${GeistSans.style.fontFamily};
              --font-sans: ${GeistSans.variable};
              --font-mono: ${GeistMono.variable};
            }
            `}</style>
            */}
        </head>
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <Analytics />
        </ThemeProvider>
        </body>
        </html>
    )
}