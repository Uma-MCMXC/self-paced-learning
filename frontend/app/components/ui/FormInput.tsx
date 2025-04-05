'use client'

import clsx from 'clsx'

type FormInputProps = {
  id: string
  label: string
  placeholder?: string
  value: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  submitted?: boolean
  disabled?: boolean
  type?: 'text' | 'email' | 'number' | 'password' | 'tel'
}

export default function FormInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  submitted,
  type = 'text',
  name,
  disabled = false,
}: FormInputProps) {
  return (
    <div className="form-control w-full">
      <label htmlFor={id} className="mb-1 label">
        <span className="label-text text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </span>
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={clsx(
          'w-full px-3 py-2 rounded border text-md',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          'bg-white text-black dark:bg-gray-900 dark:text-white',
          {
            'border-red-500': submitted && error,
            'border-gray-300': !disabled && !(submitted && error),
            'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed': disabled,
          }
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        disabled={disabled}
      />
      {error && (
        <span id={`${id}-error`} className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
