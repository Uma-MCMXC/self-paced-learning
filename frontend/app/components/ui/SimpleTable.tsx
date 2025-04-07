'use client'

import React, { useState } from 'react'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid'

export type TableRow = Record<string, string | number | React.ReactNode> & {
  _isSubjectRow?: boolean
}

export default function SimpleTable({
  data,
  thead,
  rowsPerPage = 5,
}: {
  data: TableRow[]
  thead?: React.ReactNode
  rowsPerPage?: number
}) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage)

  let displayIndex = (currentPage - 1) * rowsPerPage + 1

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="overflow-x-auto w-full rounded-box border border-base-content/10 bg-base-100 dark:bg-gray-900">
        <table className="table w-full">
          {thead && (
            <thead className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white">
              {thead}
            </thead>
          )}

          <tbody>
            {paginatedData.map((row, index) => {
              const isSubjectRow = row._isSubjectRow
              return (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? 'bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100'
                      : 'bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                  }`}
                >
                  <th className="font-semibold">{!isSubjectRow ? displayIndex++ : ''}</th>
                  {Object.entries(row).map(([key, value]) => {
                    if (key === '_isSubjectRow') return null
                    return (
                      <td key={key} className="text-gray-800 dark:text-gray-100">
                        {value}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded border text-sm font-medium transition-colors duration-150 ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
              : 'bg-white text-gray-800 dark:bg-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <ChevronDoubleLeftIcon className="w-4 h-4 dark:text-white" />
        </button>

        <span className="text-sm text-gray-800 dark:text-white">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded border text-sm font-medium transition-colors duration-150 ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
              : 'bg-white text-gray-800 dark:bg-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <ChevronDoubleRightIcon className="w-4 h-4 dark:text-white" />
        </button>
      </div>
    </div>
  )
}
