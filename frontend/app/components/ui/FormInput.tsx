'use client'

import clsx from 'clsx'

type FormInputProps = {
  id: string
  label: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  submitted?: boolean
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
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={clsx(
          'input input-md w-full',
          'bg-white text-gray-400 dark:bg-gray-900 dark:text-white dark:border-gray-600 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500',
          {
            'input-error border-red-500': submitted && error,
          }
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span id={`${id}-error`} className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
