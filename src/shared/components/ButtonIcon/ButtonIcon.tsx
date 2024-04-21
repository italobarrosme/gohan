import { Icon } from '@iconify/react'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonIconProps = {
  label?: string
  icon: string
  width?: number
  height?: number
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonIcon = ({
  onClick,
  children,
  icon,
  height,
  width,
}: ButtonIconProps) => {
  return (
    <>
      <button
        type="button"
        id="buttonIcon"
        className="flex items-center gap-2 rounded-full bg-brand-primary p-2 font-bold text-white hover:bg-brand-secondary"
        onClick={onClick}
      >
        {children}
        <Icon icon={icon} width={width} height={height} />
      </button>
    </>
  )
}
