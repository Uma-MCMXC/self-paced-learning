'use client'

import React, { useState, useRef } from 'react'
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
import ConfirmModal from '@/app/components/ui/ConfirmModal'

// type Lecturer และ type Course
type Lecturer = { name: string; role: 'Owner' | 'Co-Owner' }

type Course = {
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
const Courses: Course[] = [
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

export default function ManageCourse() {
  // useState เก็บสถานะของ Modal และ Toast
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [courseList, setCourseList] = useState<Course[]>(Courses)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  // toggleStatus() ฟังก์ชันสำหรับเปลี่ยนสถานะวิชา
  const toggleStatus = (id: string) => {
    setCourseList((prev) =>
      prev.map((course) =>
        course.id === id
          ? { ...course, status: course.status === 'active' ? 'inactive' : 'active' }
          : course
      )
    )

    setToastMsg('Course status has been updated.')
    setTimeout(() => setToastMsg(null), 3000)
  }

  const handleView = (course: Course) => {
    setSelectedCourse(course)
    const modal = document.getElementById('course_modal') as HTMLDialogElement
    modal?.showModal()
  }

  // การลบ
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null)
  const confirmRef = useRef<HTMLDialogElement>(null)

  const handleDeleteClick = (course: Course) => {
    setDeletingCourse(course)
    confirmRef.current?.showModal()
  }

  const handleDeleteConfirmed = () => {
    if (deletingCourse) {
      setCourseList((prev) => prev.filter((c) => c.id !== deletingCourse.id))
      setToastMsg(`Course "${deletingCourse.name}" has been deleted.`)
      setDeletingCourse(null)
      setTimeout(() => setToastMsg(null), 3000)
    }
  }

  // สร้างข้อมูลให้ตาราง SimpleTable
  const data: TableRow[] = courseList.map((course) => ({
    courseName: (
      <div className="text-sm">
        <div className="font-medium text-gray-900 dark:text-gray-100">{course.name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{course.lessons} Lessons</div>
      </div>
    ),
    lecturer: (
      <div className="text-sm space-y-3">
        {course.lecturers.some((l) => l.role === 'Owner') && (
          <div>
            <div className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200 mb-1">
              <UserIcon className="w-4 h-4 text-blue-700 dark:text-blue-400" />
              <span>Owner</span>
            </div>
            <ul className="ml-6 list-disc text-gray-800 dark:text-gray-100">
              {course.lecturers
                .filter((l) => l.role === 'Owner')
                .map((l, i) => (
                  <li key={`owner-${i}`}>{l.name}</li>
                ))}
            </ul>
          </div>
        )}
        {course.lecturers.some((l) => l.role === 'Co-Owner') && (
          <div>
            <div className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200 mb-1">
              <UserIcon className="w-4 h-4 text-blue-700 dark:text-blue-400" />
              <span>Co-Owner</span>
            </div>
            <ul className="ml-6 list-disc text-gray-800 dark:text-gray-100">
              {course.lecturers
                .filter((l) => l.role === 'Co-Owner')
                .map((l, i) => (
                  <li key={`coowner-${i}`}>{l.name}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    ),
    status: <StatusToggleButton status={course.status} onClick={() => toggleStatus(course.id)} />,
    action: (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <button title="View" onClick={() => handleView(course)}>
          <EyeIcon className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
        </button>
        <Link href={`/lecturer/course/edit/${course.id}`} title="Edit">
          <PencilSquareIcon className="w-5 h-5 text-green-500 hover:text-green-700 cursor-pointer" />
        </Link>
        <button title="Delete" onClick={() => handleDeleteClick(course)}>
          <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
        </button>
      </div>
    ),
  }))

  return (
    <PageContainer title="Manage Course">
      {toastMsg && <Toast message={toastMsg} type="success" />}
      <div className="w-full">
        <div className="flex justify-end mb-5">
          <Button
            label="Create Course"
            variant="success"
            size="md"
            href="/lecturer/course/create"
          />
        </div>

        <SimpleTable
          data={data}
          rowsPerPage={25}
          thead={
            <tr>
              <th className="w-6">#</th>
              <th>Course</th>
              <th>Lecturer</th>
              <th className="min-w-[150px]">Status</th>
              <th>Action</th>
            </tr>
          }
        />
      </div>

      <Modal
        id="course_modal"
        icon={<BookOpenIcon className="w-7 h-7" />}
        title="Course Info"
        onClose={() => setSelectedCourse(null)}
      >
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-100">Status:</span>{' '}
          <Badge
            variant={selectedCourse?.status === 'active' ? 'success' : 'error'}
            className="ml-1 badge-soft"
          >
            {selectedCourse?.status === 'active' ? 'active' : 'inactive'}
          </Badge>
        </div>

        <div className="text-sm space-y-3 mt-4">
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-100">Course:</span>{' '}
            <span className="text-gray-600 dark:text-gray-300">{selectedCourse?.course}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-100">Course:</span>{' '}
            <span className="text-gray-600 dark:text-gray-300">{selectedCourse?.name}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-100">Description:</span>{' '}
            <span className="text-gray-600 dark:text-gray-300">{selectedCourse?.description}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-100">Total Lessons:</span>{' '}
            <span className="text-gray-600 dark:text-gray-300">{selectedCourse?.lessons}</span>
          </p>

          {selectedCourse?.lecturers && (
            <div className="space-y-3 mt-4">
              {selectedCourse.lecturers.some((l) => l.role === 'Owner') && (
                <div>
                  <div className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
                    <UserIcon className="w-4 h-4 text-blue-700" />
                    <span>Owner</span>
                  </div>
                  <ul className="ml-6 list-disc text-gray-700 dark:text-gray-300">
                    {selectedCourse.lecturers
                      .filter((l) => l.role === 'Owner')
                      .map((l, i) => (
                        <li key={`owner-${i}`}>{l.name}</li>
                      ))}
                  </ul>
                </div>
              )}
              {selectedCourse.lecturers.some((l) => l.role === 'Co-Owner') && (
                <div>
                  <div className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
                    <UsersIcon className="w-4 h-4 text-blue-700" />
                    <span>Co-Owner</span>
                  </div>
                  <ul className="ml-6 list-disc text-gray-700 dark:text-gray-300">
                    {selectedCourse.lecturers
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

        <hr className="my-4 border-gray-200 dark:border-gray-700" />

        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>
            <span className="font-semibold text-gray-600 dark:text-gray-300">Created By:</span>{' '}
            {selectedCourse?.createdBy}
          </p>
          <p>
            <span className="font-semibold text-gray-600 dark:text-gray-300">Updated At:</span>{' '}
            {selectedCourse?.updatedAt}
          </p>
        </div>
      </Modal>

      <ConfirmModal
        id="confirm_delete_course"
        ref={confirmRef}
        title="Delete Course"
        message={`Are you sure you want to delete "${deletingCourse?.name}"?`}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => confirmRef.current?.close()}
        size="sm"
      />
    </PageContainer>
  )
}
