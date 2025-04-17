'use client'

import React, { forwardRef } from 'react'
import clsx from 'clsx'
import Button from './Button'

type ModalProps = {
  id: string
  title?: string
  icon?: React.ReactNode
  children: React.ReactNode
  onClose?: () => void
  size?: 'sm' | 'md' | 'lg'
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ id, title, icon, children, onClose, size = 'md' }, ref) => {
    const sizeClass = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-2xl',
    }

    return (
      <dialog id={id} className="modal" ref={ref}>
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
              <Button label="Close" variant="neutral" size="sm" onClick={onClose} />
            </form>
          </div>
        </div>
      </dialog>
    )
  }
)

Modal.displayName = 'Modal'
export default Modal
