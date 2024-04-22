import { ReactNode } from 'react'
import { Metadata } from 'next'
import { Navbar } from '@/modules/Navigation/components/Navbar'
import { LogoutForm } from '@/modules/Authentication/Forms/LogoutForm'

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

export default async function RootLayout({ children }: Props) {
  return (
    <>
      <header className="mb-12">
        <Navbar>
          <LogoutForm />
        </Navbar>
      </header>
      {children}
    </>
  )
}
