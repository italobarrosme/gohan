import '@/styles/globals.css'

import { ReactNode } from 'react'
import { Metadata } from 'next'
import { ToastProvider } from '@/providers/toast'
import { Candal } from 'next/font/google'
import { cn } from '@/utils'
import { LoadingGlobal } from '@/modules/LoadingGlobal/components/LoadingGlobal'

type Props = {
  children?: ReactNode
}

export const metadata: Metadata = {
  title: 'Rehistories',
  description: `Rehistories is a web application that allows you to restore images.`,
  manifest: '/manifest.json',
  icons: {
    apple: '/apple-icon.png',
  },
}

const candal = Candal({
  weight: '400',
  variable: '--font-candal',
  subsets: ['latin'],
})
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={cn(
          'flex min-h-screen flex-col items-center bg-effect-granula p-4 text-brand-dark font-candal',
          candal.variable
        )}
      >
        <ToastProvider>
          <main>{children}</main>
        </ToastProvider>
        <LoadingGlobal />
      </body>
    </html>
  )
}
