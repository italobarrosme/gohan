'use client'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const buttonVariantStyle = tv({
  base: 'flex items-center gap-4 whitespace-nowrap rounded bg-brand-primary px-4 py-2 font-bold text-white transition-colors delay-300 hover:bg-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    color: {
      primary: 'bg-brand-primary hover:bg-brand-secondary',
      secondary: 'bg-brand-secondary hover:bg-brand-primary',
      danger: 'bg-red-500 hover:bg-red-600',
    },
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
})

type ButtonVariantsProps = VariantProps<typeof buttonVariantStyle>

export type ButtonProps = {
  className?: string
  icon?: string
  children: ReactNode
  variant?: ButtonVariantsProps
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  className,
  type,
  icon = '',
  children,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(buttonVariantStyle(variant), className)}
      {...props}
    >
      {icon ? <Icon icon={icon} width={24} /> : null}
      {children}
    </button>
  )
}
