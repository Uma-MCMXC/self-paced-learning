'use client'

import React from 'react'
import clsx from 'clsx'

type ModalProps = {
  id: string
  title?: string
  icon?: React.ReactNode
  children: React.ReactNode
  onClose?: () => void
  size?: 'sm' | 'md' | 'lg'
}

export default function Modal({ id, title, icon, children, onClose, size = 'md' }: ModalProps) {
  const sizeClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
  }

  return (
    <dialog id={id} className="modal">
      <div
        className={clsx(
          'modal-box w-full',
          sizeClass[size],
          'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100'
        )}
      >
        {title && (
          <div className="flex items-center gap-2 border-b pb-3 mb-4 border-gray-200 dark:border-slate-600">
            {icon}
            <h3 className="font-bold text-lg">{title}</h3>
          </div>
        )}

        <div className="space-y-2 text-sm">{children}</div>

        <div className="modal-action mt-6">
          <form method="dialog">
            <button
              className="btn btn-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 border border-gray-300 dark:border-slate-600"
              onClick={onClose}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
