'use client'

import React from 'react'
import clsx from 'clsx'
import Button from './Button'

export type ConfirmModalProps = {
  id: string
  title?: string
  message?: string
  icon?: React.ReactNode
  onConfirm: () => void
  onCancel?: () => void
  size?: 'sm' | 'md' | 'lg'
  confirmText?: string
  cancelText?: string
}

const ConfirmModal = React.forwardRef<HTMLDialogElement, ConfirmModalProps>(
  (
    {
      id,
      title = 'Confirm',
      message = 'Are you sure you want to proceed?',
      icon,
      onConfirm,
      onCancel,
      size = 'md',
      confirmText = 'OK',
      cancelText = 'Cancel',
    },
    ref
  ) => {
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
          <div className="flex items-center gap-2 border-b pb-3 mb-4 border-gray-200 dark:border-slate-600">
            {icon}
            <h3 className="font-bold text-lg">{title}</h3>
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-200">{message}</div>

          <div className="modal-action mt-6 flex justify-end gap-2">
            <form method="dialog">
              <Button label={cancelText} variant="outline" size="sm" onClick={onCancel} />
            </form>
            <Button label={confirmText} variant="error" size="sm" onClick={onConfirm} />
          </div>
        </div>
      </dialog>
    )
  }
)

ConfirmModal.displayName = 'ConfirmModal'
export default ConfirmModal
