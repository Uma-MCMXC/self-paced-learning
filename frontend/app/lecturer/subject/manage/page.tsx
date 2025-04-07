'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import PageContainer from '@/app/components/ui/PageContainer'
import SimpleTable, { TableRow } from '@/app/components/ui/SimpleTable'
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { UserIcon, UsersIcon, BookOpenIcon } from '@heroicons/react/24/solid'
import Badge from '@/app/components/ui/Badge'
import Modal from '@/app/components/ui/Modal'
import Button from '@/app/components/ui/Button'
import Toast from '@/app/components/ui/Toast'
import StatusToggleButton from '@/app/components/ui/StatusToggleButton'

// type Lecturer และ type Subject
type Lecturer = { name: string; role: 'Owner' | 'Co-Owner' }

type Subject = {
  id: string
  name: string
  lessons: number
  status: 'active' | 'inactive'
  course: string
  description: string
  createdBy: string
  updatedAt: string
  lecturers: Lecturer[]
}

// Mock data
const subjects: Subject[] = [
  {
    id: '1',
    name: 'Information Technology',
    lessons: 10,
    status: 'active',
    course: 'Digital Business',
    description: 'Covers networking, databases, and IT project management.',
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
    name: 'Information Technology',
    lessons: 10,
    status: 'inactive',
    course: 'Digital Business',
    description: 'Covers networking, databases, and IT project management.',
    createdBy: 'Staff User',
    updatedAt: '2025-04-06 10:20',
    lecturers: [
      { name: 'Dr. Bob', role: 'Owner' },
      { name: 'Dr. Carol', role: 'Co-Owner' },
      { name: 'Dr. Alice', role: 'Co-Owner' },
    ],
  },
]

export default function ManageSubject() {
  // useState เก็บสถานะของ Modal และ Toast
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [subjectList, setSubjectList] = useState<Subject[]>(subjects)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  // toggleStatus() ฟังก์ชันสำหรับเปลี่ยนสถานะวิชา
  const toggleStatus = (id: string) => {
    setSubjectList((prev) =>
      prev.map((subj) =>
        subj.id === id
          ? { ...subj, status: subj.status === 'active' ? 'inactive' : 'active' }
          : subj
      )
    )

    setToastMsg('Subject status has been updated.')
    setTimeout(() => setToastMsg(null), 3000)
  }

  const handleView = (subject: Subject) => {
    setSelectedSubject(subject)
    const modal = document.getElementById('subject_modal') as HTMLDialogElement
    modal?.showModal()
  }

  // สร้างข้อมูลให้ตาราง SimpleTable
  const data: TableRow[] = subjectList.map((subject) => ({
    subjectName: (
      <div className="text-sm">
        <div className="font-medium text-gray-900">{subject.name}</div>
        <div className="text-xs text-gray-500">{subject.lessons} Lessons</div>
      </div>
    ),
    lecturer: (
      <div className="text-sm space-y-3">
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
    status: <StatusToggleButton status={subject.status} onClick={() => toggleStatus(subject.id)} />,
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
      {toastMsg && <Toast message={toastMsg} type="success" />}
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
              <th className="min-w-[150px]">Status</th>
              <th>Action</th>
            </tr>
          }
        />
      </div>

      <Modal
        id="subject_modal"
        icon={<BookOpenIcon className="w-7 h-7" />}
        title="Subject Info"
        onClose={() => setSelectedSubject(null)}
      >
        <div>
          <span className="font-semibold text-gray-700">Status:</span>{' '}
          <Badge
            variant={selectedSubject?.status === 'active' ? 'success' : 'error'}
            className="ml-1 badge-soft"
          >
            {selectedSubject?.status === 'active' ? 'active' : 'inactive'}
          </Badge>
        </div>
        <div className="text-sm space-y-3 mt-4">
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
        <hr className="my-4 border-gray-200" />
        <div className="text-xs text-gray-500">
          <p>
            <span className="font-semibold text-gray-600">Created By:</span>{' '}
            {selectedSubject?.createdBy}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Updated At:</span>{' '}
            {selectedSubject?.updatedAt}
          </p>
        </div>
      </Modal>
    </PageContainer>
  )
}
