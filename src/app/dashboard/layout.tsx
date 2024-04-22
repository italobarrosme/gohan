import { ReactNode } from 'react'
import { Metadata } from 'next'

type Props = {
  children?: ReactNode
}

export const metadata: Metadata = {
  title: 'Dashboard - Rehistories',
  description: `Dashboard of Rehistories.`,
  manifest: '/manifest.json',
  icons: {
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: Props) {
  return <section>{children}</section>
}
