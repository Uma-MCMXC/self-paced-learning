'use client'

import { useState, useEffect, useRef } from 'react'
import { XMarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

type Option = {
  label: string
  value: string
}

type MultiSelectProps = {
  id: string
  label: string
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  required?: boolean
  submitted?: boolean // ใช้ตรวจว่า submit แล้วหรือยัง
  error?: string
}

export default function MultiSelect({
  id,
  label,
  options,
  selected,
  onChange,
  required = false,
  submitted = false,
  error,
}: MultiSelectProps) {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  )

  const isInvalid = submitted && required && selected.length === 0

  return (
    <div className="form-control w-full" ref={wrapperRef}>
      <label htmlFor={id} className="mb-1 label">
        <span className="label-text text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </span>
      </label>

      <div
        tabIndex={0}
        className={`w-full flex items-center justify-between border rounded px-3 py-2 cursor-pointer ${
          isInvalid ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
        } bg-white dark:bg-gray-900 text-black dark:text-white`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {selected.length > 0
            ? options
                .filter((opt) => selected.includes(opt.value))
                .map((opt) => opt.label)
                .join(', ')
            : 'Select options'}
        </span>
        <span className="ml-2 text-sm text-gray-400">
          {isOpen ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
        </span>
      </div>

      {isOpen && (
        <div className="mt-2 p-2 border border-gray-300 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-800 shadow-md max-h-60 overflow-auto z-10">
          <input
            type="text"
            placeholder="Search..."
            className="input input-sm input-bordered w-full mb-2 bg-white border-b border-gray-300 text-black dark:bg-gray-900 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filteredOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-800 dark:text-white"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => toggleSelect(opt.value)}
                className="checkbox checkbox-primary w-4 h-4"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      )}

      {isInvalid && <span className="text-red-500 text-sm mt-1">This field is required.</span>}

      {error && !isInvalid && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  )
}
