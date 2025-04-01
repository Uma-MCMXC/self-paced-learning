'use client'

import React from 'react'

type PageContainerProps = {
  title: string
  children: React.ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children }: PageContainerProps) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="text-gray-700 dark:text-gray-300 text-base">{children}</div>
    </div>
  )
}

export default PageContainer
