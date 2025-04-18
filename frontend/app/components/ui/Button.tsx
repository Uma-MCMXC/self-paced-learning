'use client'

import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

type ButtonProps = {
  label: string
  href?: string
  className?: string
  variant?:
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  disabled?: boolean
  onClick?: () => void
  icon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  label,
  href,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'submit',
  icon,
}) => {
  const buttonClass = clsx(
    'btn',
    {
      'btn-neutral': variant === 'neutral',
      'btn-primary': variant === 'primary',
      'btn-secondary': variant === 'secondary',
      'btn-accent': variant === 'accent',
      'btn-info': variant === 'info',
      'btn-success': variant === 'success',
      'btn-warning': variant === 'warning',
      'btn-error': variant === 'error',
      'btn-outline': variant === 'outline',
    },
    {
      'btn-xs': size === 'xs',
      'btn-sm': size === 'sm',
      'btn-md': size === 'md',
      'btn-lg': size === 'lg',
    },
    fullWidth && 'w-full',
    disabled && 'btn-disabled',
    className
  )

  return href ? (
    <Link href={href} className={buttonClass}>
      {label}
    </Link>
  ) : (
    <button className={buttonClass} onClick={onClick} disabled={disabled} type={type}>
      {label}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  )
}

export default Button
