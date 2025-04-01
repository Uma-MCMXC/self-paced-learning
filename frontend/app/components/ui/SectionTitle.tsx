'use client'

import React from 'react'

export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="card-title text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
      {children}
    </h2>
  )
}
