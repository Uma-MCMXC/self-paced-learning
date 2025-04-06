'use client'

import React from 'react'

type ModalProps = {
  id: string
  title?: string
  icon?: React.ReactNode
  children: React.ReactNode
  onClose?: () => void
}

export default function Modal({ id, title, icon, children, onClose }: ModalProps) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box w-11/12 max-w-md">
        {title && (
          <div className="flex items-center gap-2 border-b pb-2 mb-4">
            {icon}
            <h3 className="font-bold text-lg text-gray-800">{title}</h3>
          </div>
        )}
        <div>{children}</div>
        <div className="modal-action mt-4">
          <form method="dialog">
            <button className="btn btn-sm btn-outline" onClick={onClose}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
