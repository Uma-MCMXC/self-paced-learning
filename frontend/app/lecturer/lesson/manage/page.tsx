'use client'

import React from 'react'
import Link from 'next/link'
import PageContainer from '@/app/components/ui/PageContainer'
import Button from '@/app/components/ui/Button'
import CardContainer from '@/app/components/ui/CardContainer'
import SectionTitle from '@/app/components/ui/SectionTitle'
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

type Lecturer = { name: string; role: 'Owner' | 'Co-Owner' }
type Subject = {
  id: string
  subject: string
  lessons: string
  content: string
  createdBy: string
  updatedAt: string
  lecturers: Lecturer[]
}

// 🔹 Mock Data (flattened)
const lessons: Subject[] = [
  {
    id: '1',
    subject: 'Information Technology',
    lessons: 'บทที่ 1',
    content: 'Covers networking, databases, and IT project management.',
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
    lessons: 'บทที่ 2',
    content: 'Advanced topics in IT project planning.',
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
    lessons: 'บทที่ 1',
    content: 'Database design and normalization.',
    createdBy: 'Staff User',
    updatedAt: '2025-04-06 10:30',
    lecturers: [
      { name: 'Dr. Bob', role: 'Owner' },
      { name: 'Dr. Alice', role: 'Co-Owner' },
    ],
  },
]

// 🔹 Group by subject
const groupBySubject = lessons.reduce<Record<string, Subject[]>>((acc, lesson) => {
  if (!acc[lesson.subject]) acc[lesson.subject] = []
  acc[lesson.subject].push(lesson)
  return acc
}, {})

export default function GroupedSubjectLessons() {
  return (
    <PageContainer title="Manage Lessons">
      <p className="text-sm text-base-600 mb-4">
        Below is a list of lessons with subject and actions.
      </p>

      <div className="flex justify-end mb-4">
        <Button label="Create Lesson" variant="success" size="md" href="/lecturer/lesson/create" />
      </div>

      <div className="space-y-6">
        {Object.entries(groupBySubject).map(([subjectName, lessons]) => (
          <CardContainer key={subjectName}>
            <SectionTitle>{subjectName}</SectionTitle>

            <ul className="space-y-4">
              {lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className="flex flex-col md:flex-row md:items-center justify-between border border-gray-100 rounded px-4 py-3 bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-700">{lesson.lessons}</p>
                    <p className="text-sm text-gray-500 mb-1">{lesson.content}</p>

                    <div className="text-sm text-gray-700">
                      <strong>Instructors:</strong> {lesson.lecturers.map((l) => l.name).join(', ')}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 md:mt-0 md:ml-4">
                    <button title="View" onClick={() => alert(`View ${lesson.subject}`)}>
                      <EyeIcon className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
                    </button>
                    <Link href={`/lecturer/subject/edit/${lesson.id}`} title="Edit">
                      <PencilSquareIcon className="w-5 h-5 text-green-500 hover:text-green-700 cursor-pointer" />
                    </Link>
                    <button
                      title="Delete"
                      onClick={() =>
                        confirm(`Delete lesson "${lesson.lessons}"?`) && alert('Deleted')
                      }
                    >
                      <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContainer>
        ))}
      </div>
    </PageContainer>
  )
}
