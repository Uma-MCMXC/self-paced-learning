'use client'

import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'

type Option = {
  label: string
  value: string
}

type SelectInputProps = {
  id?: string
  label?: string
  name?: string
  value?: string
  onChange: (value: string) => void
  required?: boolean
  error?: string
  options: Option[]
  disabled?: boolean
}

export default function SelectInput({
  id,
  label,
  value,
  name,
  onChange,
  required = false,
  error,
  options,
  disabled = false,
}: SelectInputProps) {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  )

  // Close dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedLabel = options.find((opt) => opt.value === value)?.label

  return (
    <div className="form-control w-full relative" ref={wrapperRef}>
      {label && (
        <label htmlFor={id} className="mb-1 label">
          <span className="label-text text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
          </span>
        </label>
      )}

      <div
        className={clsx(
          'flex items-center justify-between dark:border-gray-600 border border-gray-300 rounded px-3 py-2 bg-white text-black dark:bg-gray-900 dark:text-white cursor-pointer',
          {
            'border-red-500': error,
            'opacity-50 cursor-not-allowed': disabled,
          }
        )}
        onClick={() => {
          if (!disabled) setIsOpen(!isOpen)
        }}
      >
        <span className="truncate">{selectedLabel || 'Select...'}</span>

        {/* ปุ่มล้างค่า */}
        {value && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation() // กันไม่ให้เปิด dropdown
              onChange('')
            }}
            className="ml-2 text-gray-400 hover:text-red-500"
            aria-label="Clear selection"
          >
            ×
          </button>
        )}

        <span className="ml-2 text-sm text-gray-400">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="mt-2 dark:border-gray-600 border border-gray-300 rounded bg-white text-black dark:bg-gray-800 dark:text-white shadow-md absolute z-10 w-full max-h-60 overflow-y-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border-b border-gray-200 outline-none bg-white text-black dark:bg-gray-800 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value)
                  setIsOpen(false)
                  setSearch('')
                }}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                {opt.label}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">No options found</div>
          )}
        </div>
      )}

      {error && (
        <span className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
