'use client'

import React, { useState } from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import SimpleTable, { TableRow } from '@/app/components/ui/SimpleTable'
import Button from '@/app/components/ui/Button'
import StatusToggleButton from '@/app/components/ui/StatusToggleButton'
import Toast from '@/app/components/ui/Toast'
import Link from 'next/link'
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

type Lecturer = { name: string; role: 'Owner' | 'Co-Owner' }
type Subject = {
  id: string
  subject: string
  status: 'active' | 'inactive'
  lessons: string
  content: string
  createdBy: string
  updatedAt: string
  lecturers: Lecturer[]
}

const initialLessons: Subject[] = [
  {
    id: '1',
    subject: 'Information Technology',
    lessons: 'บทที่ 1 xxx',
    content: 'Covers networking, databases, and IT project management.',
    status: 'active',
    createdBy: 'Staff User',
    updatedAt: '2025-04-06 10:20',
    lecturers: [
      { name: 'Dr. Bob', role: 'Owner' },
      { name: 'Dr. Carol', role: 'Co-Owner' },
      { name: 'Dr. Alice', role: 'Co-Owner' },
    ],
  },
  {
    id: '2',
    subject: 'Information Technology',
    lessons: 'บทที่ 2 xxx',
    content: 'Advanced topics in IT project planning.',
    status: 'active',
    createdBy: 'Staff User',
    updatedAt: '2025-04-06 10:25',
    lecturers: [
      { name: 'Dr. Bob', role: 'Owner' },
      { name: 'Dr. Carol', role: 'Co-Owner' },
    ],
  },
  {
    id: '3',
    subject: 'Database',
    lessons: 'บทที่ 1 xxx',
    content: 'Database design and normalization.',
    status: 'inactive',
    createdBy: 'Staff User',
    updatedAt: '2025-04-06 10:30',
    lecturers: [
      { name: 'Dr. Bob', role: 'Owner' },
      { name: 'Dr. Alice', role: 'Co-Owner' },
    ],
  },
]

export default function LessonTablePage() {
  const [lessonList, setLessonList] = useState<Subject[]>(initialLessons)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const toggleStatus = (id: string) => {
    setLessonList((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: l.status === 'active' ? 'inactive' : 'active' } : l
      )
    )

    setToastMsg('Lesson status updated.')
    setTimeout(() => setToastMsg(null), 3000)
  }

  const groupedLessons = lessonList.reduce<Record<string, Subject[]>>((acc, lesson) => {
    if (!acc[lesson.subject]) acc[lesson.subject] = []
    acc[lesson.subject].push(lesson)
    return acc
  }, {})

  const groupedData: TableRow[] = []

  Object.entries(groupedLessons).forEach(([subjectName, lessons]) => {
    groupedData.push({
      _isSubjectRow: true,
      subject: (
        <div className="font-bold text-blue-800 dark:text-white">Subject: {subjectName}</div>
      ),
      instructors: '',
      status: '',
      action: '',
    })

    lessons.forEach((lesson) => {
      groupedData.push({
        subject: (
          <div>
            <div className="font-medium text-gray-800 dark:text-white">{lesson.lessons}</div>
          </div>
        ),
        instructors: (
          <div className="text-sm">{lesson.lecturers.map((l) => l.name).join(', ')}</div>
        ),
        status: (
          <StatusToggleButton status={lesson.status} onClick={() => toggleStatus(lesson.id)} />
        ),
        action: (
          <div className="flex gap-2">
            <button title="View" onClick={() => alert(`View ${lesson.subject}`)}>
              <EyeIcon className="w-5 h-5 text-blue-500 hover:text-blue-700" />
            </button>
            <Link href={`/lecturer/subject/edit/${lesson.id}`} title="Edit">
              <PencilSquareIcon className="w-5 h-5 text-green-500 hover:text-green-700" />
            </Link>
            <button
              title="Delete"
              onClick={() => confirm(`Delete lesson "${lesson.lessons}"?`) && alert('Deleted')}
            >
              <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700" />
            </button>
          </div>
        ),
      })
    })
  })

  return (
    <PageContainer title="Manage Lessons">
      {toastMsg && <Toast message={toastMsg} type="success" />}
      <div className="flex justify-end mb-4">
        <Button label="Create Lesson" variant="success" href="/lecturer/lesson/create" />
      </div>

      <SimpleTable
        data={groupedData}
        rowsPerPage={5}
        thead={
          <tr>
            <th className="w-6">#</th>
            <th>Lesson</th>
            <th>Instructors</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        }
      />
    </PageContainer>
  )
}
