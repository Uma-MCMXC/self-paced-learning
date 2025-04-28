'use client'

import React from 'react'

type CardProps = {
  header?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ header, title, description, children, footer }) => {
  return (
    <div className="card bg-base-100 shadow-md border bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="card-body space-y-2">
        {header && <div className="">{header}</div>}

        <h2 className="card-title">{title}</h2>

        {description && <div className="text-gray-500 text-sm">{description}</div>}

        {children}

        {footer && <div className="card-actions justify-end mt-4">{footer}</div>}
      </div>
    </div>
  )
}

export default Card
