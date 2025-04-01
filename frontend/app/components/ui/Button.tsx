'use client'

import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

type ButtonProps = {
  label: string
  href?: string // ✅ รองรับการใช้เป็น Link
  variant?:
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  disabled?: boolean
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  label,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'submit',
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
    },
    {
      'btn-xs': size === 'xs',
      'btn-sm': size === 'sm',
      'btn-md': size === 'md',
      'btn-lg': size === 'lg',
    },
    fullWidth && 'w-full',
    disabled && 'btn-disabled'
  )

  return href ? (
    <Link href={href} className={buttonClass}>
      {label}
    </Link>
  ) : (
    <button className={buttonClass} onClick={onClick} disabled={disabled} type={type}>
      {label}
    </button>
  )
}

export default Button
