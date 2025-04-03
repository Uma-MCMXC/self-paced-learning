'use client'

import React from 'react'
import clsx from 'clsx'

type Option = {
  value: string
  label: string
}

type RadioGroupInputProps = {
  name: string
  label: string
  options: Option[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  required?: boolean
  disabled?: boolean
}

export default function RadioGroupInput({
  name,
  label,
  options,
  value,
  defaultValue,
  onChange,
  required = false,
  disabled = false,
}: RadioGroupInputProps) {
  return (
    <div className="form-control w-full">
      <label className="label mb-1">
        <span className="label-text text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </span>
      </label>

      <div className="flex gap-6">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="inline-flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-200"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              className={clsx(
                'w-4 h-4 rounded-full border-2 outline-none appearance-none transition-all',
                'border-gray-400 checked:border-blue-500 checked:bg-blue-500',
                'flex items-center justify-center',
                'after:content-[""] after:block after:w-2.5 after:h-2.5 after:rounded-full',
                'after:mx-auto after:my-auto after:bg-white checked:after:bg-white'
              )}
              {...(value !== undefined
                ? { checked: value === opt.value }
                : { defaultChecked: opt.value === defaultValue })}
              onChange={(e) => onChange?.(e.target.value)}
              required={required}
              disabled={disabled}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
