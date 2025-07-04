'use client'

import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import { XMarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

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
  error?: boolean
  errorMessage?: string
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
  errorMessage,
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
        <div className="flex items-center justify-between w-full gap-2">
          <span className="truncate">{selectedLabel || 'Select...'}</span>

          <div className="flex items-center gap-1">
            {value && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange('')
                }}
                className="text-gray-400 hover:text-red-500"
                aria-label="Clear selection"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
            <span className="text-sm text-gray-400">
              {isOpen ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className={clsx(
            'mt-2 border border-gray-300 dark:border-gray-600 rounded bg-white text-black dark:bg-gray-800 dark:text-white shadow-md absolute z-50 w-full max-h-60 overflow-auto',
            'bottom-full' // ลองให้ dropdown แสดงขึ้นบนแทน
          )}
        >
          {/* input search */}
          <input
            name={name}
            required={required}
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border-b border-gray-200 outline-none bg-white text-black dark:bg-gray-800 dark:text-white sticky top-0 z-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* list */}
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
          {error && errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
        </span>
      )}
    </div>
  )
}
