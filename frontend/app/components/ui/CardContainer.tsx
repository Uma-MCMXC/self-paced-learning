'use client'

import React from 'react'

type CardProps = {
  children: React.ReactNode
}

export default function CardContainer({ children }: CardProps) {
  return (
    <div className="card w-full mt-4 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="card-body">{children}</div>
    </div>
  )
}
