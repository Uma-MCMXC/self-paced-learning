'use client'

import React, { useState } from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import Button from '@/app/components/ui/Button'
import StatusToggleButton from '@/app/components/ui/StatusToggleButton'
import Toast from '@/app/components/ui/Toast'
import SelectInput from '@/app/components/ui/SelectInput'
import CardContainer from '@/app/components/ui/CardContainer'
import FormInput from '@/app/components/ui/FormInput'
import Badge from '@/app/components/ui/Badge'
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowsUpDownIcon,
  ClockIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  VideoCameraIcon,
  DocumentIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const sampleLessons = [
  {
    id: '1',
    course: 'Information Technology',
    type: 'Main Lesson',
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `1.${i + 1}`,
      title: `บทที่ ${i + 1}`,
      updatedAt: '2025-04-01',
      duration: `${5 + i} mins`,
      sub:
        i % 2 === 0
          ? Array.from({ length: 2 }, (_, j) => ({
              id: `1.${i + 1}.${j + 1}`,
              title: `บทที่ ${i + 1}.${j + 1}`,
            }))
          : [],
      status: i % 3 === 0 ? 'inactive' : 'active',
      instructors: [`Dr. ${i % 2 === 0 ? 'Bob' : 'Alice'}`],
      videoUrl: 'https://youtu.be/sample',
      pdfUrl: '/docs/sample.pdf',
      files: [{ name: 'slide.pdf' }, { name: 'quiz.docx' }],
    })),
  },
  {
    id: '2',
    course: 'Data Science',
    type: 'Supplementary Lesson',
    lessons: [
      {
        id: '2.1',
        title: 'บทที่ 1',
        updatedAt: '2025-04-15',
        duration: '7 mins',
        status: 'active',
        instructors: ['Dr. Lisa'],
        videoUrl: '',
        pdfUrl: '',
        files: [],
      },
    ],
  },
  {
    id: '3',
    course: 'Computer Science',
    type: 'Main Lesson',
    lessons: [
      {
        id: '3.1',
        title: 'บทที่ 1',
        updatedAt: '2025-03-30',
        duration: '8 mins',
        status: 'inactive',
        instructors: ['Dr. John'],
        videoUrl: '',
        pdfUrl: '',
        files: [],
      },
    ],
  },
]

const reportOptions = [
  { label: 'Main Lesson', value: 'Main Lesson' },
  { label: 'Supplementary Lesson', value: 'Supplementary Lesson' },
]

export default function LessonCardPage() {
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [selectedCourseId, setSelectedCourseId] = useState<string>('')
  const [selectedReport, setSelectedReport] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  const toggleStatus = (courseId: string, lessonId: string) => {
    const course = sampleLessons.find((s) => s.id === courseId)
    const lesson = course?.lessons.find((l) => l.id === lessonId)
    if (lesson) {
      lesson.status = lesson.status === 'active' ? 'inactive' : 'active'
      setToastMsg('Lesson status updated.')
      setTimeout(() => setToastMsg(null), 3000)
    }
  }

  const filteredCourses = sampleLessons.filter(
    (c) => c.id === selectedCourseId && c.type === selectedReport
  )
  const selectedCourse = filteredCourses[0]

  const renderLessonCard = (lesson: any, courseId: string) => (
    <CardContainer key={lesson.id} className="shadow-md">
      {/* Title + ID */}
      <div className="flex justify-between items-start">
        <div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{lesson.title}</div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-col items-end gap-1 whitespace-nowrap">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            {lesson.duration}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDaysIcon className="w-4 h-4" />
            {lesson.updatedAt}
          </span>
        </div>
      </div>

      {/* Summary Info */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
        {lesson.sub?.length > 0 && (
          <div>
            <span className="flex items-center gap-1">
              <BookOpenIcon className="w-4 h-4" /> Topic-lessons: {lesson.sub.length} บท
            </span>
          </div>
        )}
        {lesson.videoUrl && (
          <div>
            <span className="flex items-center gap-1">
              <VideoCameraIcon className="w-4 h-4" /> Video:{' '}
              <a
                href={lesson.videoUrl}
                target="_blank"
                className="text-blue-500 hover:underline"
                rel="noopener noreferrer"
              >
                Watch
              </a>
            </span>
          </div>
        )}
        {lesson.pdfUrl && (
          <div>
            <span className="flex items-center gap-1">
              <DocumentIcon className="w-4 h-4" /> PDF:{' '}
              <a
                href={lesson.pdfUrl}
                target="_blank"
                className="text-blue-500 hover:underline"
                rel="noopener noreferrer"
              >
                View
              </a>
            </span>
          </div>
        )}
        {lesson.files?.length > 0 && (
          <div>
            <span className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" /> Link:{' '}
              <a
                href={lesson.pdfUrl}
                target="_blank"
                className="text-blue-500 hover:underline"
                rel="noopener noreferrer"
              >
                View
              </a>
            </span>
          </div>
        )}
      </div>

      {/* Instructor */}
      <div className="text-sm mt-3 text-gray-700 dark:text-gray-300">
        👨‍🏫 <span className="font-medium">Instructors:</span> {lesson.instructors.join(', ')}
      </div>

      {/* Action Buttons */}
      <div className="mt-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <StatusToggleButton
            status={lesson.status}
            onClick={() => toggleStatus(courseId, lesson.id)}
          />
          <Badge variant="neutral" className="badge-md border badge-soft border-gray-800">
            #ID: {lesson.id}
          </Badge>
        </div>

        <div className="flex gap-3">
          <Link href={`#`} title="Edit">
            <PencilSquareIcon className="w-5 h-5 text-green-500 hover:text-green-700" />
          </Link>
          <button title="Delete">
            <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700" />
          </button>
        </div>
      </div>
    </CardContainer>
  )

  return (
    <PageContainer title="Manage Lessons">
      <div className="mb-5 text-end">
        <Link href="/lecturer/lesson/create" title="Create Lesson">
          <Button label="Create Lesson" variant="success" />
        </Link>
      </div>
      {toastMsg && <Toast message={toastMsg} type="success" />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <SelectInput
          id="reportType"
          label="Select Lesson Type"
          value={selectedReport}
          onChange={setSelectedReport}
          options={reportOptions}
        />
        <SelectInput
          id="course"
          label="Select Course"
          value={selectedCourseId}
          onChange={setSelectedCourseId}
          options={sampleLessons.map((s) => ({ label: s.course, value: s.id }))}
        />
      </div>

      {selectedReport && selectedCourse && (
        <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <div className="text-xl font-bold text-indigo-700 dark:text-white">
              {selectedReport.toUpperCase()}: {selectedCourse.course}
            </div>
            <div className="flex gap-3">
              <Link href={`/lecturer/lesson/view/${selectedCourse.id}`} title="View Lesson">
                <EyeIcon className="w-5 h-5 text-blue-500 hover:text-blue-700" />
              </Link>
              <Link
                href={`/lecturer/lesson/edit/order-course/${selectedCourse.id}`}
                title="Edit Order Course"
              >
                <ArrowsUpDownIcon className="w-5 h-5 text-green-500 hover:text-green-700" />
              </Link>
            </div>
          </div>
          <div className="mb-3">
            <FormInput
              id="lesson-search"
              name="lessonSearch"
              label="Search"
              placeholder="Search lessons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* show lesson */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            {selectedCourse.lessons.map((lesson) => renderLessonCard(lesson, selectedCourse.id))}
          </div>
        </div>
      )}
    </PageContainer>
  )
}
