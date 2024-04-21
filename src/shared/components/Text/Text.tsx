'use client'

import { HTMLAttributes, ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils'

const textStyle = cva([], {
  variants: {
    variant: {
      h1: 'my-2 font-bold',
      h2: 'my-2 font-semibold',
      h3: 'my-2 font-semibold',
      h4: 'my-2 font-semibold',
      h5: 'my-2 font-semibold',
      h6: 'my-2 font-semibold',
      p: 'break-normal text-base font-normal',
      small: 'text-xs',
      label: 'my-2 text-sm font-semibold',
    },
  },
  defaultVariants: {
    variant: 'h1',
  },
})

type VariantType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'small'
  | 'label'

type SelectedTags = keyof JSX.IntrinsicElements extends infer K
  ? K extends VariantType
    ? K
    : never
  : never

type TextProps = {
  children: ReactNode
  variant?: SelectedTags
  className?: string
} & HTMLAttributes<HTMLElement>

export const Text = ({
  children,
  variant = 'h1',
  className,
  ...props
}: TextProps) => {
  const Tag = variant

  return (
    <Tag className={cn(textStyle({ variant }), className)} {...props}>
      {children}
    </Tag>
  )
}
