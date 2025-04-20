'use client'

import React, { useState } from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import Button from '@/app/components/ui/Button'
import StatusToggleButton from '@/app/components/ui/StatusToggleButton'
import Toast from '@/app/components/ui/Toast'
import CardContainer from '@/app/components/ui/CardContainer'
import FormInput from '@/app/components/ui/FormInput'
import Badge from '@/app/components/ui/Badge'
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  ClockIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  VideoCameraIcon,
  DocumentIcon,
  LinkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

// sampleLessons remains unchanged
const sampleLessons = [
  // 🟦 MAIN LESSONS
  {
    id: '1',
    course: 'Information Technology',
    type: 'Main Lesson',
    lessons: [
      {
        id: '1.1',
        title: 'บทที่ 1: Introduction to IT',
        updatedAt: '2025-04-01',
        duration: '10 mins',
        sub: [],
        status: 'active',
        instructors: ['Dr. Bob'],
        videoUrl: 'https://youtu.be/sample1',
        pdfUrl: '/docs/sample1.pdf',
        files: [],
      },
      {
        id: '1.2',
        title: 'บทที่ 2: Computer Hardware',
        updatedAt: '2025-04-02',
        duration: '12 mins',
        sub: [],
        status: 'active',
        instructors: ['Dr. Alice'],
        videoUrl: 'https://youtu.be/sample2',
        pdfUrl: '/docs/sample2.pdf',
        files: [],
      },
    ],
  },
  {
    id: '2',
    course: 'Computer Science',
    type: 'Main Lesson',
    lessons: [
      {
        id: '2.1',
        title: 'บทที่ 1: Algorithms',
        updatedAt: '2025-04-03',
        duration: '15 mins',
        sub: [],
        status: 'inactive',
        instructors: ['Dr. John'],
        videoUrl: '',
        pdfUrl: '',
        files: [],
      },
    ],
  },
  {
    id: '3',
    course: 'Software Engineering',
    type: 'Main Lesson',
    lessons: [
      {
        id: '3.1',
        title: 'บทที่ 1: Software Development Life Cycle',
        updatedAt: '2025-04-04',
        duration: '9 mins',
        sub: [],
        status: 'active',
        instructors: ['Dr. Kim'],
        videoUrl: '',
        pdfUrl: '',
        files: [],
      },
    ],
  },
  {
    id: '4',
    course: 'Web Development',
    type: 'Main Lesson',
    lessons: [
      {
        id: '4.1',
        title: 'บทที่ 1: HTML Basics',
        updatedAt: '2025-04-05',
        duration: '11 mins',
        sub: [],
        status: 'active',
        instructors: ['Dr. Sam'],
        videoUrl: 'https://youtu.be/sample-html',
        pdfUrl: '',
        files: [],
      },
    ],
  },
  {
    id: '5',
    course: 'Database Systems',
    type: 'Main Lesson',
    lessons: [
      {
        id: '5.1',
        title: 'บทที่ 1: Relational Databases',
        updatedAt: '2025-04-06',
        duration: '13 mins',
        sub: [],
        status: 'active',
        instructors: ['Dr. Nina'],
        videoUrl: '',
        pdfUrl: '/docs/db.pdf',
        files: [],
      },
    ],
  },

  // 🟩 SUPPLEMENTARY LESSONS
  {
    id: '6',
    course: 'Data Science',
    type: 'Supplementary Lesson',
    lessons: [
      {
        id: '6.1',
        title: 'เสริม: Data Cleaning',
        updatedAt: '2025-04-07',
        duration: '7 mins',
        sub: [],
        status: 'active',
        instructors: ['Dr. Lisa'],
        videoUrl: '',
        pdfUrl: '',
        files: [],
      },
    ],
  },
  {
    id: '7',
    course: 'Cybersecurity',
    type: 'Supplementary Lesson',
    lessons: [
      {
        id: '7.1',
        title: 'เสริม: Password Management',
        updatedAt: '2025-04-08',
        duration: '5 mins',
        sub: [],
        status: 'active',
        instructors: ['Dr. Ray'],
        videoUrl: '',
        pdfUrl: '',
        files: [],
      },
    ],
  },
  {
    id: '8',
    course: 'Cloud Computing',
    type: 'Supplementary Lesson',
    lessons: [
      {
        id: '8.1',
        title: 'เสริม: Intro to AWS',
        updatedAt: '2025-04-09',
        duration: '6 mins',
        sub: [],
        status: 'inactive',
        instructors: ['Dr. Kate'],
        videoUrl: '',
        pdfUrl: '',
        files: [],
      },
    ],
  },
  {
    id: '9',
    course: 'AI Fundamentals',
    type: 'Supplementary Lesson',
    lessons: [
      {
        id: '9.1',
        title: 'เสริม: AI Ethics',
        updatedAt: '2025-04-10',
        duration: '9 mins',
        sub: [],
        status: 'active',
        instructors: ['Dr. Ben'],
        videoUrl: '',
        pdfUrl: '',
        files: [],
      },
    ],
  },
  {
    id: '10',
    course: 'IoT Basics',
    type: 'Supplementary Lesson',
    lessons: [
      {
        id: '10.1',
        title: 'เสริม: Sensor Networks',
        updatedAt: '2025-04-11',
        duration: '10 mins',
        sub: [],
        status: 'active',
        instructors: ['Dr. June'],
        videoUrl: '',
        pdfUrl: '',
        files: [],
      },
    ],
  },
]

export default function LessonCardPage() {
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [expandedCourses, setExpandedCourses] = useState<string[]>([])
  const [showAllCourses, setShowAllCourses] = useState<Record<string, boolean>>({})

  const toggleStatus = (courseId: string, lessonId: string) => {
    const course = sampleLessons.find((s) => s.id === courseId)
    const lesson = course?.lessons.find((l) => l.id === lessonId)
    if (lesson) {
      lesson.status = lesson.status === 'active' ? 'inactive' : 'active'
      setToastMsg('Lesson status updated.')
      setTimeout(() => setToastMsg(null), 3000)
    }
  }

  const toggleCourseExpand = (courseId: string) => {
    setExpandedCourses((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    )
  }

  const toggleShowAllCourses = (type: string) => {
    setShowAllCourses((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  const renderLessonCard = (lesson: any, courseId: string) => (
    <CardContainer key={lesson.id} className="shadow border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div className="text-base font-semibold text-gray-900 dark:text-white">{lesson.title}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-col items-end gap-1">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" /> {lesson.duration}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDaysIcon className="w-4 h-4" /> {lesson.updatedAt}
          </span>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
        {lesson.sub?.length > 0 && (
          <div className="flex items-center gap-1">
            <BookOpenIcon className="w-4 h-4" /> {lesson.sub.length} Topics
          </div>
        )}
        {lesson.videoUrl && (
          <div className="flex items-center gap-1">
            <VideoCameraIcon className="w-4 h-4" />
            <a
              href={lesson.videoUrl}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch
            </a>
          </div>
        )}
        {lesson.pdfUrl && (
          <div className="flex items-center gap-1">
            <DocumentIcon className="w-4 h-4" />
            <a
              href={lesson.pdfUrl}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF
            </a>
          </div>
        )}
        {lesson.files?.length > 0 && (
          <div className="flex items-center gap-1">
            <LinkIcon className="w-4 h-4" /> {lesson.files.length} Attachments
          </div>
        )}
      </div>
      <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
        👨‍🏫 <span className="font-medium">Instructors:</span> {lesson.instructors.join(', ')}
      </div>
      <div className="mt-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <StatusToggleButton
            status={lesson.status}
            onClick={() => toggleStatus(courseId, lesson.id)}
          />
          <Badge variant="neutral" className="text-xs border">
            #ID: {lesson.id}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Link href={`/lecturer/lesson/view/${courseId}`}>
            <EyeIcon className="w-4 h-4 text-blue-500 hover:text-blue-700" />
          </Link>
          <Link href={`/lecturer/lesson/edit/order-course/${courseId}`}>
            <PencilSquareIcon className="w-4 h-4 text-green-500 hover:text-green-700" />
          </Link>
          <TrashIcon className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" />
        </div>
      </div>
    </CardContainer>
  )

  const groupedLessons = sampleLessons.reduce(
    (acc, course) => {
      const type = course.type
      if (!acc[type]) acc[type] = []
      acc[type].push(course)
      return acc
    },
    {} as Record<string, typeof sampleLessons>
  )

  return (
    <PageContainer title="Manage Lessons">
      <div className="mb-8 text-end">
        <Link href="/lecturer/lesson/create">
          <Button label="Create Lesson" variant="success" />
        </Link>
      </div>
      {toastMsg && <Toast message={toastMsg} type="success" />}

      {Object.entries(groupedLessons).map(([type, courses]) => (
        <div key={type} className="mb-8">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-bold text-indigo-700 dark:text-white">
              {type.toUpperCase()}
            </h2>
            {courses.length > 3 && (
              <button
                className="text-sm text-indigo-600 border border-indigo-300 hover:bg-indigo-50 px-3 py-1 rounded"
                onClick={() => toggleShowAllCourses(type)}
              >
                {showAllCourses[type] ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>

          {(showAllCourses[type] ? courses : courses.slice(0, 3)).map((course) => (
            <div key={course.id} className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow mb-4">
              <div className="flex items-center justify-between mb-3">
                {/* ชื่อรายวิชา */}
                <button
                  className="text-lg font-semibold text-slate-800 dark:text-white hover:text-indigo-600 transition"
                  onClick={() => toggleCourseExpand(course.id)}
                >
                  {expandedCourses.includes(course.id) ? (
                    <ChevronUpIcon className="inline w-4 h-4 mr-2" />
                  ) : (
                    <ChevronDownIcon className="inline w-4 h-4 mr-2" />
                  )}
                  {course.course}
                </button>
                <div className="flex gap-2">
                  <Link href={`/lecturer/lesson/view/${course.id}`}>
                    <EyeIcon className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                  </Link>
                  <Link href={`/lecturer/lesson/edit/order-course/${course.id}`}>
                    <PencilSquareIcon className="w-5 h-5 text-green-500 hover:text-green-700" />
                  </Link>
                </div>
              </div>
              {expandedCourses.includes(course.id) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.lessons.map((lesson) => renderLessonCard(lesson, course.id))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </PageContainer>
  )
}
