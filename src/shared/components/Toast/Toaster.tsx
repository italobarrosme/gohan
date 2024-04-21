'use client'

import { cn } from '@/utils'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast'
import { useToast } from './useToast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        status,
        ...props
      }) {
        return (
          <Toast
            key={id}
            {...props}
            className={cn(
              status === 'success' && 'bg-green-400',
              status === 'error' && 'bg-red-400',
              status === 'warning' && 'bg-orange-300',
              status === 'info' && 'bg-blue-300'
            )}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
