'use client'

import React, { useEffect, useState } from 'react'

type TextareaInputProps = {
  id: string
  label: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
  maxLength?: number
  submitted?: boolean
  error?: string
  name: string
}

export default function TextareaInput({
  id,
  label,
  placeholder = '',
  value,
  onChange,
  required = false,
  maxLength,
  submitted = false,
  error,
  name,
}: TextareaInputProps) {
  const [internalError, setInternalError] = useState('')

  useEffect(() => {
    if (submitted) {
      if (required && !value.trim()) {
        setInternalError('This field is required.')
      } else if (maxLength && value.length > maxLength) {
        setInternalError(`Must not exceed ${maxLength} characters.`)
      } else {
        setInternalError('')
      }
    }
  }, [submitted, value, required, maxLength])

  const hasError = internalError || error

  return (
    <div className="form-control w-full">
      <label htmlFor={id} className="label mb-1">
        <span className="label-text text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </span>
      </label>

      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`textarea textarea-bordered w-full min-h-[120px]
          bg-white text-black placeholder:text-gray-400 dark:border-gray-600 border border-gray-300
          dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500
          ${hasError ? 'border-red-500' : ''}
        `}
        maxLength={maxLength}
      />

      <div className="mt-1 flex justify-between text-sm">
        {maxLength && (
          <span className="text-gray-500 dark:text-gray-400">
            {value.length}/{maxLength} characters
          </span>
        )}
        {hasError && (
          <span className="text-red-500 text-sm text-right">{error || internalError}</span>
        )}
      </div>
    </div>
  )
}
