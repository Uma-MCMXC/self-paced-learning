'use client'

import React, { useState, useEffect, useRef } from 'react'

type FileInputProps = {
  label: string
  maxSizeMB?: number
  onFileChange: (file: File | null) => void
  required?: boolean
  submitted?: boolean
  accept?: string
}

export default function FileInput({
  label,
  maxSizeMB = 5,
  onFileChange,
  required = false,
  submitted = false,
  accept = '*/*',
}: FileInputProps) {
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
      const fileSizeMB = selectedFile.size / (1024 * 1024)

      if (fileSizeMB > maxSizeMB) {
        setError(`❌ File must not exceed ${maxSizeMB}MB`)
        setFileName('')
        setFile(null)
        onFileChange(null)
        return
      }

      setError('')
      setFile(selectedFile)
      setFileName(selectedFile.name)
      onFileChange(selectedFile)
    }
  }

  const handleClearFile = () => {
    setFile(null)
    setFileName('')
    setError('')
    onFileChange(null)

    // รีเซ็ต <input type="file">
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  useEffect(() => {
    if (submitted && required && !file) {
      setError('❌ File is required')
    }
  }, [submitted, required, file])

  return (
    <div className="form-control w-full">
      <label className="label mb-1">
        <span className="label-text text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </span>
      </label>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className={`file-input file-input-bordered file-input-md w-full bg-white text-black border border-gray-300 text-md rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-600 ${
          error ? 'border-red-500' : ''
        }`}
      />

      <div className="mt-2 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>
          {fileName ? (
            <span className="text-green-500">📎 {fileName}</span>
          ) : (
            `Max size ${maxSizeMB}MB`
          )}
        </span>
        {file && (
          <button type="button" onClick={handleClearFile} className="text-red-500 hover:underline">
            Clear
          </button>
        )}
      </div>

      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  )
}
