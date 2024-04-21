'use client'

import { Toaster } from '@/shared/components/Toast'
import { ReactNode } from 'react'

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
