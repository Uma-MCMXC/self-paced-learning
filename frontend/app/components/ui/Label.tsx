import React from 'react'

type LabelProps = {
  children: React.ReactNode
  htmlFor: string
}

const Label: React.FC<LabelProps> = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
    >
      {children}
    </label>
  )
}

export default Label
