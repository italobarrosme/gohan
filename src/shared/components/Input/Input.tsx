'use client'

import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useState,
} from 'react'

import { Text } from '../Text'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from 'src/utils'

const inputStyles = cva(
  [
    'flex h-10 w-full rounded-md border border-brand-soft bg-transparent p-3 pb-4 text-sm ring-offset-brand-soft transition-colors delay-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-brand-dark/30 hover:bg-brand-soft/40 focus:border-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      hasError: {
        true: 'border-feedback-error focus-visible:border-feedback-error focus-visible:ring-feedback-error/10',
      },
      readOnly: {
        true: 'cursor-not-allowed bg-brand-soft text-brand-dark file:cursor-not-allowed file:bg-brand-soft file:text-brand-dark focus:border-brand-soft focus-visible:border-brand-soft focus-visible:ring-transparent focus-visible:ring-offset-transparent',
      },
      modeDark: {
        true: 'bg-brand-light text-brand-dark placeholder-brand-dark hover:bg-brand-light/90',
      },
    },
  }
)

type InputStylesProps = VariantProps<typeof inputStyles>

type LinkProps = {
  label?: string
  href?: string
}

export type InputProps = {
  label?: string
  errorMessage?: string
  accessoryText?: string
  link?: LinkProps
  iconLeft?: ReactNode
  iconRight?: ReactNode
  modeDark?: boolean
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void
  type?: Omit<
    HTMLInputTypeAttribute,
    | 'image'
    | 'password'
    | 'color'
    | 'radio'
    | 'button'
    | 'submit'
    | 'checkbox'
    | 'range'
    | 'reset'
    | 'tel'
  >
} & InputStylesProps &
  InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      id,
      label,
      hasError,
      readOnly,
      accessoryText,
      modeDark,
      errorMessage,
      disabled,
      iconLeft,
      iconRight,
      onInput,
      maxLength,
      ...props
    },
    ref
  ) => {
    const [caractersCount, setCaractersCount] = useState(0)

    return (
      <div
        className={cn('flex flex-col', {
          'pointer-events-none opacity-60': disabled,
        })}
      >
        <div
          className={cn('flex justify-between', {
            'text-brand-light': modeDark,
          })}
        >
          {label && (
            <Text variant="label" className="mb-1">
              {label}
            </Text>
          )}
        </div>
        <div className="relative flex justify-between gap-5">
          {iconLeft && (
            <div className="absolute left-3 top-3 flex items-center">
              {iconLeft}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputStyles({ hasError, readOnly, modeDark }),
              { 'pl-vb-10': !!iconLeft },
              { 'pr-vb-10': !!iconRight },
              className
            )}
            id={id}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            onInput={(e) => {
              onInput && onInput(e)
              setCaractersCount(e.currentTarget.value.length)
            }}
            ref={ref}
            {...props}
          />
          {iconRight && (
            <div className="absolute right-3 top-3 flex items-center">
              {iconRight}
            </div>
          )}
        </div>

        <div
          className={cn(
            'w-full relative',
            hasError
              ? 'text-feedback-error'
              : modeDark
                ? 'text-brand-light'
                : 'text-brand-dark'
          )}
        >
          {hasError && errorMessage && (
            <Text variant="p" className="mt-1 text-xs">
              {errorMessage}
            </Text>
          )}
          {accessoryText && !errorMessage && (
            <Text
              variant="p"
              className={
                modeDark
                  ? 'absolute left-0 mt-1 text-xs text-brand-light'
                  : 'absolute left-0 mt-1 text-xs text-brand-dark'
              }
            >
              {accessoryText}
            </Text>
          )}
          {maxLength && (
            <Text
              variant="p"
              className={
                modeDark
                  ? 'absolute right-0 mt-1 text-xs text-brand-light'
                  : 'absolute right-0 mt-1 text-xs text-brand-dark'
              }
            >
              {caractersCount}/{maxLength}
            </Text>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'
