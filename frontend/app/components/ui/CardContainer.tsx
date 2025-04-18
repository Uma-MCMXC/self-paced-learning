'use client'

import React from 'react'

type CardProps = {
  children: React.ReactNode
  className?: string // เพิ่ม className เป็น optional prop
}

export default function CardContainer({ children, className = '' }: CardProps) {
  return (
    <div
      className={`card w-full mt-4 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${className}`}
    >
      <div className="card-body">{children}</div>
    </div>
  )
}
