'use client'

import React from 'react'

type SectionTitleProps = {
  title: string
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h2 className="card-title text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">{title}</h2>
  )
}
