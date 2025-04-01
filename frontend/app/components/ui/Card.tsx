'use client'

import React from 'react'

type CardProps = {
  header?: React.ReactNode // ✅ ข้อความ/ไอคอนด้านบน
  title: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ header, title, description, children, footer }) => {
  return (
    <div className="card bg-base-100 shadow-md border bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="card-body space-y-2">
        {/* ✅ ส่วน Header ด้านบน */}
        {header && <div className="text-sm text-gray-400">{header}</div>}

        <h2 className="card-title">{title}</h2>

        {description && <p className="text-base-600">{description}</p>}
        {children}

        {footer && <div className="card-actions justify-end mt-4">{footer}</div>}
      </div>
    </div>
  )
}

export default Card
