'use client'

import React from 'react'
import clsx from 'clsx'
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

type ToastProps = {
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
}

export default function Toast({ message, type = 'info' }: ToastProps) {
  const iconMap = {
    info: <InformationCircleIcon className="w-5 h-5" />,
    success: <CheckCircleIcon className="w-5 h-5" />,
    warning: <ExclamationTriangleIcon className="w-5 h-5" />,
    error: <XCircleIcon className="w-5 h-5" />,
  }

  return (
    <div
      role="alert"
      className={clsx(
        'alert alert-soft fixed top-4 right-4 z-50 w-fit shadow-lg animate-fade-in-out',
        {
          'alert-info': type === 'info',
          'alert-success': type === 'success',
          'alert-warning': type === 'warning',
          'alert-error': type === 'error',
        }
      )}
    >
      {iconMap[type]}
      <span>{message}</span>
    </div>
  )
}
