'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import PageContainer from '@/app/components/ui/PageContainer'
import SimpleTable, { TableRow } from '@/app/components/ui/SimpleTable'
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { UserIcon, UsersIcon, BookOpenIcon } from '@heroicons/react/24/solid'
import Modal from '@/app/components/ui/Modal'
import Button from '@/app/components/ui/Button'

type Lecturer = { name: string; role: 'Owner' | 'Co-Owner' }
type Subject = {
  id: string
  name: string
  lessons: number
  course: string
  description: string
  lecturers: Lecturer[]
}

// 🔹 Mock Data
const subjects: Subject[] = [
  {
    id: '1',
    name: 'Computer Science',
    lessons: 10,
    course: 'Digital Innovation',
    description: 'Focus on software development and systems analysis.',
    lecturers: [
      { name: 'Dr. Alice', role: 'Owner' },
      { name: 'Dr. Bob', role: 'Co-Owner' },
    ],
  },
  {
    id: '2',
    name: 'Information Technology',
    lessons: 10,
    course: 'Digital Business',
    description: 'Covers networking, databases, and IT project management.',
    lecturers: [
      { name: 'Dr. Bob', role: 'Owner' },
      { name: 'Dr. Carol', role: 'Co-Owner' },
      { name: 'Dr. Alice', role: 'Co-Owner' },
    ],
  },
]

export default function ManageSubject() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

  const handleView = (subject: Subject) => {
    setSelectedSubject(subject)
    const modal = document.getElementById('subject_modal') as HTMLDialogElement
    modal?.showModal()
  }

  const data: TableRow[] = subjects.map((subject) => ({
    subjectName: (
      <div className="text-sm">
        <div className="font-medium text-gray-900">{subject.name}</div>
        <div className="text-xs text-gray-500">{subject.lessons} Lessons</div>
      </div>
    ),
    lecturer: (
      <div className="text-sm space-y-3">
        {/* Owner group */}
        {subject.lecturers.some((l) => l.role === 'Owner') && (
          <div>
            <div className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
              <UserIcon className="w-4 h-4 text-blue-700" />
              <span>Owner</span>
            </div>
            <ul className="ml-6 list-disc text-gray-800">
              {subject.lecturers
                .filter((l) => l.role === 'Owner')
                .map((l, i) => (
                  <li key={`owner-${i}`}>{l.name}</li>
                ))}
            </ul>
          </div>
        )}

        {/* Co-Owner group */}
        {subject.lecturers.some((l) => l.role === 'Co-Owner') && (
          <div>
            <div className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
              <UsersIcon className="w-4 h-4 text-blue-700" />
              <span>Co-Owner</span>
            </div>
            <ul className="ml-6 list-disc text-gray-800">
              {subject.lecturers
                .filter((l) => l.role === 'Co-Owner')
                .map((l, i) => (
                  <li key={`coowner-${i}`}>{l.name}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    ),
    action: (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <button title="View" onClick={() => handleView(subject)}>
          <EyeIcon className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
        </button>
        <Link href={`/lecturer/subject/edit/${subject.id}`} title="Edit">
          <PencilSquareIcon className="w-5 h-5 text-green-500 hover:text-green-700 cursor-pointer" />
        </Link>
        <button
          title="Delete"
          onClick={() => confirm(`Delete subject "${subject.name}"?`) && alert('Deleted')}
        >
          <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
        </button>
      </div>
    ),
  }))

  return (
    <PageContainer title="Manage Subject">
      <p className="text-sm text-base-600 mb-4">
        Below is a list of subjects with instructors and actions.
      </p>

      <div className="w-full">
        <div className="flex justify-end mb-5">
          <Button
            label="Create Subject"
            variant="success"
            size="md"
            href="/lecturer/subject/create"
          />
        </div>

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

      {/* ✅ Modal component */}
      <Modal
        id="subject_modal"
        icon={<BookOpenIcon className="w-7 h-7" />}
        title="Subject Info"
        onClose={() => setSelectedSubject(null)}
      >
        <div className="text-sm space-y-3">
          <p>
            <span className="font-semibold text-gray-700">Course:</span> {selectedSubject?.course}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Subject:</span> {selectedSubject?.name}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Description:</span>{' '}
            {selectedSubject?.description}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Total Lessons:</span>{' '}
            {selectedSubject?.lessons}
          </p>

          {selectedSubject?.lecturers && (
            <div className="space-y-3 mt-4">
              {selectedSubject.lecturers.some((l) => l.role === 'Owner') && (
                <div>
                  <div className="flex items-center gap-2 font-semibold text-gray-800">
                    <UserIcon className="w-4 h-4 text-blue-700" />
                    <span>Owner</span>
                  </div>
                  <ul className="ml-6 list-disc text-gray-600">
                    {selectedSubject.lecturers
                      .filter((l) => l.role === 'Owner')
                      .map((l, i) => (
                        <li key={`owner-${i}`}>{l.name}</li>
                      ))}
                  </ul>
                </div>
              )}
              {selectedSubject.lecturers.some((l) => l.role === 'Co-Owner') && (
                <div>
                  <div className="flex items-center gap-2 font-semibold text-gray-800">
                    <UsersIcon className="w-4 h-4 text-blue-700" />
                    <span>Co-Owner</span>
                  </div>
                  <ul className="ml-6 list-disc text-gray-600">
                    {selectedSubject.lecturers
                      .filter((l) => l.role === 'Co-Owner')
                      .map((l, i) => (
                        <li key={`coowner-${i}`}>{l.name}</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </PageContainer>
  )
}
