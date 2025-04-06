'use client'

import React from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import SimpleTable, { TableRow } from '@/app/components/ui/SimpleTable'
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { UserIcon, UsersIcon } from '@heroicons/react/24/solid'

const renderLecturer = (lecturers: { name: string; role: 'Owner' | 'Co-Owner' }[]) => {
  const grouped = lecturers.reduce(
    (acc, curr) => {
      acc[curr.role].push(curr.name)
      return acc
    },
    {
      Owner: [] as string[],
      'Co-Owner': [] as string[],
    }
  )

  return (
    <div className="text-sm space-y-4">
      {grouped.Owner.length > 0 && (
        <div>
          <div className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
            <UserIcon className="w-4 h-4 text-blue-700" />
            <span>Owner</span>
          </div>
          <ul className="ml-1 list-disc list-inside text-gray-800">
            {grouped.Owner.map((name, i) => (
              <li key={`owner-${i}`}>{name}</li>
            ))}
          </ul>
        </div>
      )}
      {grouped['Co-Owner'].length > 0 && (
        <div>
          <div className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
            <UsersIcon className="w-4 h-4 text-blue-700" />
            <span>Co-Owner</span>
          </div>
          <ul className="ml-1 list-disc list-inside text-gray-800">
            {grouped['Co-Owner'].map((name, i) => (
              <li key={`coowner-${i}`}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function ManageSubject() {
  const data: TableRow[] = [
    {
      subjectName: (
        <div className="text-sm">
          <div className="font-medium text-gray-900">Computer Science</div>
          <div className="text-xs text-gray-500">10 Lessons</div>
        </div>
      ),
      lecturer: renderLecturer([
        { name: 'Dr. Alice', role: 'Owner' },
        { name: 'Dr. Bob', role: 'Co-Owner' },
      ]),
      action: (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <a href="/student/report-history/view" title="View">
            <EyeIcon className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
          </a>
          <a href="/subject/edit" title="Edit">
            <PencilSquareIcon className="w-5 h-5 text-green-500 hover:text-green-700 cursor-pointer" />
          </a>
          <button title="Delete" onClick={() => alert('Confirm delete')}>
            <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
          </button>
        </div>
      ),
    },
    {
      subjectName: (
        <div className="text-sm">
          <div className="font-medium text-gray-900">Information Technology</div>
          <div className="text-xs text-gray-500">10 Lessons</div>
        </div>
      ),
      lecturer: renderLecturer([
        { name: 'Dr. Bob', role: 'Owner' },
        { name: 'Dr. Carol', role: 'Co-Owner' },
        { name: 'Dr. Alice', role: 'Co-Owner' },
      ]),
      action: (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <a href="/student/report-history/view" title="View">
            <EyeIcon className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
          </a>
          <a href="/subject/edit" title="Edit">
            <PencilSquareIcon className="w-5 h-5 text-green-500 hover:text-green-700 cursor-pointer" />
          </a>
          <button title="Delete" onClick={() => alert('Confirm delete')}>
            <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <PageContainer title="Manage Subject">
      <p className="text-sm text-base-600">This is the manage subject page content.</p>

      <div className="w-full mt-8">
        <SimpleTable
          data={data}
          rowsPerPage={25}
          thead={
            <tr>
              <th className="w-6">#</th>
              <th>Subject</th>
              <th>Lecturer</th>
              <th>Action</th>
            </tr>
          }
        />
      </div>
    </PageContainer>
  )
}
