'use client'

import React from 'react'
import clsx from 'clsx'

type StatusToggleButtonProps = {
  status: 1 | 0
  onClick: () => void
  title?: string
}

export default function StatusToggleButton({ status, onClick, title }: StatusToggleButtonProps) {
  const isActive = status === 1

  return (
    <button
      onClick={onClick}
      title={title || 'คลิกเพื่อสลับสถานะ'}
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 border',
        isActive
          ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
          : 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200'
      )}
    >
      <div
        className={clsx(
          'w-2 h-2 rounded-full mr-2 transition-colors',
          isActive ? 'bg-green-500' : 'bg-red-500'
        )}
      ></div>
      {isActive ? 'active' : 'inactive'}
    </button>
  )
}
