import { ReactNode } from 'react'
import { Text } from '../Text'
import { cn } from '@/utils'

type CardInfoProps = {
  isShow?: boolean
  children: ReactNode
  title?: string
  className?: string
}

export const CardInfo = ({
  isShow = true,
  title,
  className,
  children,
}: CardInfoProps) => {
  return (
    <div
      className={cn(
        isShow ? 'flex flex-col bg-brand-light p-4 w-full' : 'hidden',
        className
      )}
    >
      <Text variant="h6">{title}</Text>
      {children}
    </div>
  )
}
