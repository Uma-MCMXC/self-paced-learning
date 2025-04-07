'use client'

import React from 'react'
import clsx from 'clsx'

type StatusToggleButtonProps = {
  status: 'active' | 'inactive'
  onClick: () => void
  title?: string
}

export default function StatusToggleButton({ status, onClick, title }: StatusToggleButtonProps) {
  const isActive = status === 'active'

  return (
    <button
      onClick={onClick}
      title={title || 'คลิกเพื่อสลับสถานะ'}
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 shadow-sm border',
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
