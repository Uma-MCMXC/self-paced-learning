// components/ui/CardContainer.tsx
'use client'

import React, { forwardRef } from 'react'
import clsx from 'clsx'

type CardProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLDivElement> // 👈 สำคัญมาก

const CardContainer = forwardRef<HTMLDivElement, CardProps>(function CardContainer(
  { children, className = '', style, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      style={style}
      {...rest} // 👈 ต้องกระจาย attributes
      className={clsx(
        'card w-full mt-4 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700',
        className
      )}
    >
      <div className="card-body">{children}</div>
    </div>
  )
})

export default CardContainer
