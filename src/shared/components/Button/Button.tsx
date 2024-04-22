'use client'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const buttonVariantStyle = tv({
  base: 'flex items-center gap-3 whitespace-nowrap rounded bg-brand-primary px-4 py-2 text-sm font-bold text-white transition-colors delay-300 hover:bg-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      primary:
        'bg-brand-primary hover:bg-brand-secondary focus-visible:ring-brand-primary',
      secondary:
        'bg-brand-secondary hover:bg-brand-primary focus-visible:ring-brand-secondary',
      danger: 'bg-red-500 hover:bg-red-600 focus-visible:ring-red-500',
      link: 'bg-transparent font-normal text-brand-secondary underline hover:bg-transparent hover:text-brand-accent focus-visible:ring-brand-primary',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

type ButtonVariantsProps = VariantProps<typeof buttonVariantStyle>

export type ButtonProps = {
  className?: string
  icon?: string
  children: ReactNode
  variant?: ButtonVariantsProps['variant']
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  className,
  type,
  icon = '',
  children,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(buttonVariantStyle({ variant }), className)}
      {...props}
    >
      {children}
      {icon ? <Icon icon={icon} width={24} /> : null}
    </button>
  )
}
