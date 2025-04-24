'use client'

import { useState } from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import Button from '@/app/components/ui/Button'
import SimpleTable from '@/app/components/ui/SimpleTable'
import StatusToggleButton from '@/app/components/ui/StatusToggleButton'
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Toast from '@/app/components/ui/Toast'

const sampleQuestionSets = [
  // รายวิชา: Introduction to Computer Science (6 บทเรียน)
  {
    id: 'QS001',
    name: 'Intro Set - Pre 1',
    course: 'Introduction to Computer Science',
    lessons: 'Chapter 1: Algorithms and Flowcharts',
    testType: 'Pre-test',
    createdAt: '2025-04-10',
    status: 'active',
  },
  {
    id: 'QS002',
    name: 'Intro Set - Pre 2',
    course: 'Introduction to Computer Science',
    lesson: 'Chapter 2: Programming Basics',
    testType: 'Pre-test',
    createdAt: '2025-04-11',
    status: 'active',
  },
  {
    id: 'QS003',
    name: 'Intro Set - Pre 3',
    course: 'Introduction to Computer Science',
    lesson: 'Chapter 3: Number Systems',
    testType: 'Pre-test',
    createdAt: '2025-04-12',
    status: 'inactive',
  },
  {
    id: 'QS004',
    name: 'Intro Set - Post 1',
    course: 'Introduction to Computer Science',
    lesson: 'Chapter 4: Algorithms and Flowcharts',
    testType: 'Post-test',
    createdAt: '2025-04-13',
    status: 'inactive',
  },
  {
    id: 'QS005',
    name: 'Intro Set - Post 2',
    course: 'Introduction to Computer Science',
    lesson: 'Chapter 5: Data Types & Variables',
    testType: 'Post-test',
    createdAt: '2025-04-14',
    status: 'active',
  },
  {
    id: 'QS006',
    name: 'Intro Set - Post 3',
    course: 'Introduction to Computer Science',
    lesson: 'Chapter 6: Control Structures',
    testType: 'Post-test',
    createdAt: '2025-04-15',
    status: 'inactive',
  },

  // รายวิชาอื่น ๆ สำหรับการเปรียบเทียบ
  {
    id: 'QS007',
    name: 'Math Set A',
    course: 'Basic Mathematics',
    lesson: 'Chapter 1: Number Fundamentals',
    testType: 'Pre-test',
    createdAt: '2025-04-16',
    status: 'Draft',
  },
  {
    id: 'QS008',
    name: 'Physics Set A',
    course: 'General Physics I',
    lesson: 'Chapter 2: Newton’s Laws',
    testType: 'Post-test',
    createdAt: '2025-04-17',
    status: 'Published',
  },
]

export default function ManageQuestionSetPage() {
  const [questionSets, setQuestionSets] = useState(sampleQuestionSets)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null)

  const toggleStatus = (id: string) => {
    setQuestionSets((prev) =>
      prev.map((qs) =>
        qs.id === id
          ? {
              ...qs,
              status: qs.status === 'inactive' ? 'active' : 'inactive',
            }
          : qs
      )
    )
    const updated = questionSets.find((qs) => qs.id === id)
    setToast({
      message: `Status changed to ${
        updated?.status === 'active' ? 'active' : 'inactive'
      } successfully.`,
      type: 'success',
    })

    setTimeout(() => setToast(null), 3000)
  }

  return (
    <PageContainer title="Manage Question Sets">
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="w-full">
        <div className="flex justify-end mb-5 gap-4">
          <Button
            label="Export Sample Question Template"
            icon={<PlusIcon />}
            variant="primary"
            size="md"
            href="/uploads/question/question_import_multiple_and_fillin.xlsx"
          />
          <Button
            label="Create New Question Set"
            icon={<PlusIcon />}
            variant="success"
            size="md"
            href="/lecturer/question/question-set/create"
          />
        </div>

        <SimpleTable
          thead={
            <tr>
              <th>#</th>
              <th>Set Name</th>
              <th>Course</th>
              <th className="min-w-[150px]">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          }
          data={questionSets.map((qs, index) => ({
            name: (
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{qs.name}</div>
                <div className="text-sm text-gray-500">{qs.testType}</div>
              </div>
            ),
            course: (
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{qs.course}</div>
                <div className="text-sm text-gray-500">{qs.lessons}</div>
                <div className="text-xs mt-2 text-gray-400">{qs.createdAt}</div>
              </div>
            ),
            status: (
              <StatusToggleButton
                status={qs.status === 'active' ? 'active' : 'inactive'}
                onClick={() => toggleStatus(qs.id)}
                title="Toggle status"
              />
            ),
            manage: (
              <div className="flex flex-col gap-4">
                {/* Actions for Question Set */}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-gray-400 dark:text-gray-300">
                    Question Sets:
                  </span>
                  <div className="flex items-center gap-3">
                    <Link href={`/lecturer/question-sets/${qs.id}`} title="View Details">
                      <EyeIcon className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
                    </Link>
                    <Link href={`/lecturer/question-sets/edit/${qs.id}`} title="Edit Question Set">
                      <PencilSquareIcon className="w-5 h-5 text-yellow-500 hover:text-yellow-700 cursor-pointer" />
                    </Link>
                    <button title="Delete">
                      <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
                    </button>
                  </div>
                </div>

                {/* Actions for Questions in the Set */}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-gray-400 dark:text-gray-300">
                    Question Bank:
                  </span>
                  <div className="flex items-center gap-3">
                    <Link href={`/lecturer/question//${qs.id}/questions`} title="Manage Questions">
                      <EyeIcon className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
                    </Link>
                    <Link
                      href={`/lecturer/question/question-bank/create/${qs.id}`}
                      title="Create Question"
                    >
                      <PlusIcon className="w-5 h-5 text-green-500 hover:text-green-700 cursor-pointer" />
                    </Link>
                  </div>
                </div>
              </div>
            ),
            _isSubjectRow: false,
          }))}
        />
      </div>
    </PageContainer>
  )
}
