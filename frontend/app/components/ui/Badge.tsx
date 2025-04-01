'use client'

import clsx from 'clsx'

type BadgeProps = {
  children: React.ReactNode
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  className?: string
}

export default function Badge({ children, variant, className }: BadgeProps) {
  return (
    <div
      className={clsx(
        'badge',
        variant && {
          'badge-primary': variant === 'primary',
          'badge-secondary': variant === 'secondary',
          'badge-accent': variant === 'accent',
          'badge-neutral': variant === 'neutral',
          'badge-info': variant === 'info',
          'badge-success': variant === 'success',
          'badge-warning': variant === 'warning',
          'badge-error': variant === 'error',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
