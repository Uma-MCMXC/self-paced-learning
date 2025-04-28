'use client'

import React from 'react'

type ProgressProps = {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
}

export default function Progress({
  value,
  max = 100,
  label,
  showPercentage = true,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className="space-y-2">
      {/* label บน progress */}
      {label && <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</div>}

      <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700 overflow-hidden">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* แสดงเปอร์เซ็นต์ */}
      {showPercentage && (
        <div className="text-right text-xs text-gray-500">{Math.round(percentage)}%</div>
      )}
    </div>
  )
}
