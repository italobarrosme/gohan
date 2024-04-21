import { cn } from '@/utils'
import { SelectHTMLAttributes } from 'react'

type option = {
  value: string | number
  label: string
}

export type SelectInputProps = {
  label: string
  options: option[]
} & SelectHTMLAttributes<HTMLSelectElement>

export const SelectInput = ({
  label,
  options,
  disabled,
  className,
  ...props
}: SelectInputProps) => {
  return (
    <div className={cn('flex flex-col gap-2')}>
      <label htmlFor={label} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={label}
        className={cn(
          'border-1 h-9 w-80 rounded-md border-brand-primary p-2 text-brand-dark',
          className
        )}
        disabled={disabled}
        {...props}
      >
        {options.map((option: any) => (
          <option
            key={option.value}
            value={option.value}
            className="h-9 overflow-y-auto"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
