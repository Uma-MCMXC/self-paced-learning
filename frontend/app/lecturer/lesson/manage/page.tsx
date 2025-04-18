'use client'

import React, { useState } from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import Button from '@/app/components/ui/Button'
import StatusToggleButton from '@/app/components/ui/StatusToggleButton'
import Toast from '@/app/components/ui/Toast'
import SelectInput from '@/app/components/ui/SelectInput'
import CardContainer from '@/app/components/ui/CardContainer'
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

// 🔹 ข้อมูลตัวอย่างของรายวิชาและบทเรียน
const sampleLessons = [
  {
    id: '1',
    course: 'Information Technology',
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `1.${i + 1}`,
      title: `บทที่ ${i + 1}`,
      // ใส่บทย่อยเฉพาะบทเลขคู่
      sub:
        i % 2 === 0
          ? Array.from({ length: 2 }, (_, j) => ({
              id: `1.${i + 1}.${j + 1}`,
              title: `บทที่ ${i + 1}.${j + 1}`,
            }))
          : [],
      status: i % 3 === 0 ? 'inactive' : 'active', // บางบท inactive เพื่อจำลองสถานะ
      instructors: [`Dr. ${i % 2 === 0 ? 'Bob' : 'Alice'}`], // จำลองผู้สอน
    })),
  },
  // รายวิชาเพิ่มเติมอีก 7 วิชา
  {
    id: '2',
    course: 'Data Science',
    lessons: [{ id: '2.1', title: 'บทที่ 1', status: 'active', instructors: ['Dr. Lisa'] }],
  },
  {
    id: '3',
    course: 'Computer Science',
    lessons: [{ id: '3.1', title: 'บทที่ 1', status: 'inactive', instructors: ['Dr. John'] }],
  },
  {
    id: '4',
    course: 'AI',
    lessons: [{ id: '4.1', title: 'บทที่ 1', status: 'active', instructors: ['Dr. Emma'] }],
  },
  {
    id: '5',
    course: 'Cybersecurity',
    lessons: [{ id: '5.1', title: 'บทที่ 1', status: 'inactive', instructors: ['Dr. Marie'] }],
  },
  {
    id: '6',
    course: 'Big Data',
    lessons: [{ id: '6.1', title: 'บทที่ 1', status: 'active', instructors: ['Dr. Max'] }],
  },
  {
    id: '7',
    course: 'Software Engineering',
    lessons: [{ id: '7.1', title: 'บทที่ 1', status: 'active', instructors: ['Dr. Dan'] }],
  },
  {
    id: '8',
    course: 'Cloud Computing',
    lessons: [{ id: '8.1', title: 'บทที่ 1', status: 'inactive', instructors: ['Dr. Eve'] }],
  },
]

export default function LessonCardPage() {
  // แจ้งเตือนเมื่ออัปเดตสถานะบทเรียน
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  // รหัสวิชาที่เลือกจาก SelectInput
  const [selectedCourseId, setSelectedCourseId] = useState<string>('')
  // รายการบทเรียนที่ถูกคลิกเพื่อแสดงบทย่อย
  const [openLessonIds, setOpenLessonIds] = useState<string[]>([])

  // 🔹 เปลี่ยนสถานะบทเรียน
  const toggleStatus = (courseId: string, lessonId: string) => {
    const course = sampleLessons.find((s) => s.id === courseId)
    const lesson = course?.lessons.find((l) => l.id === lessonId)
    if (lesson) {
      lesson.status = lesson.status === 'active' ? 'inactive' : 'active'
      setToastMsg('Lesson status updated.')
      setTimeout(() => setToastMsg(null), 3000)
    }
  }

  // 🔹 เปิด/ปิด accordion บทย่อย
  const toggleLesson = (lessonId: string) => {
    setOpenLessonIds((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    )
  }

  // 🔹 วิชาที่ถูกเลือกจาก SelectInput
  const selectedCourse = sampleLessons.find((s) => s.id === selectedCourseId)

  // 🔹 แสดงการ์ดบทเรียน
  const renderLessonCard = (lesson: any, courseId: string) => (
    <CardContainer key={lesson.id} className="shadow-md mb-4">
      {/* หัวบทเรียน + ปุ่มเปิด/ปิด บทย่อย */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleLesson(lesson.id)}
      >
        <div className="text-lg font-semibold text-gray-900 dark:text-white">{lesson.title}</div>
        {/* แสดงลูกศรสำหรับบทย่อย */}
        {lesson.sub?.length > 0 &&
          (openLessonIds.includes(lesson.id) ? (
            <ChevronDownIcon className="w-5 h-5" />
          ) : (
            <ChevronRightIcon className="w-5 h-5" />
          ))}
      </div>

      {/* บทย่อย */}
      {lesson.sub?.length > 0 && openLessonIds.includes(lesson.id) && (
        <ul className="ml-6 mt-2 list-disc text-sm text-gray-600 dark:text-gray-300">
          {lesson.sub.map((sub: any) => (
            <li key={sub.id}>{sub.title}</li>
          ))}
        </ul>
      )}

      {/* ผู้สอน */}
      <div className="text-sm mt-3 text-gray-700 dark:text-gray-300">
        <span className="font-medium">Instructors:</span> {lesson.instructors.join(', ')}
      </div>

      {/* ปุ่มจัดการบทเรียน */}
      <div className="mt-3 flex justify-between items-center">
        <StatusToggleButton
          status={lesson.status}
          onClick={() => toggleStatus(courseId, lesson.id)}
        />
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
      {/* แจ้งเตือนเมื่อมีการอัปเดตสถานะ */}
      {toastMsg && <Toast message={toastMsg} type="success" />}

      {/* ปุ่มสร้างบทเรียนใหม่ */}
      <div className="flex justify-end mb-4">
        <Button label="Create Lesson" variant="success" href="/lecturer/lesson/create" />
      </div>

      {/* 🔹 แสดงรายวิชาแรกแบบเต็ม 10 บท */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {sampleLessons.slice(0, 1).map((course) => (
          <div key={course.id} className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <div className="text-xl font-bold text-indigo-700 dark:text-white">
                {course.course}
              </div>
              <Link href={`/lecturer/lesson/view/${course.id}`} title="View">
                <EyeIcon className="w-6 h-6 text-blue-500 hover:text-blue-700" />
              </Link>
            </div>
            {course.lessons.map((lesson) => renderLessonCard(lesson, course.id))}
          </div>
        ))}
      </div>

      {/* 🔹 Dropdown สำหรับเลือกวิชาเพิ่มเติม */}
      <div className="mt-10">
        <SelectInput
          label="View more courses"
          name="selectedCourse"
          value={selectedCourseId}
          onChange={(val) => setSelectedCourseId(val)}
          options={sampleLessons.slice(1).map((s) => ({ label: s.course, value: s.id }))}
        />

        {/* แสดงบทเรียนของวิชาที่เลือก */}
        {selectedCourse && (
          <div className="mt-6 bg-gray-50 dark:bg-slate-900 p-4 rounded-xl">
            <div className="text-xl font-bold text-indigo-700 dark:text-white mb-4 border-b pb-2">
              {selectedCourse.course}
            </div>
            {selectedCourse.lessons.map((lesson) => renderLessonCard(lesson, selectedCourse.id))}
          </div>
        )}
      </div>
    </PageContainer>
  )
}
