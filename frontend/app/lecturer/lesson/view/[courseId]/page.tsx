'use client'

import React from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import CardContainer from '@/app/components/ui/CardContainer'
import { DocumentTextIcon, VideoCameraIcon } from '@heroicons/react/24/outline'

// 🔹 ฟังก์ชันเลือกไอคอนพร้อมสี
const getIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <VideoCameraIcon className="w-5 h-5 mr-2 text-green-500" />
    case 'pdf':
      return <DocumentTextIcon className="w-5 h-5 mr-2 text-red-500" />
    case 'doc':
      return <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-500" />
    default:
      return <DocumentTextIcon className="w-5 h-5 mr-2" />
  }
}

// 🔹 ข้อมูลบทเรียนตัวอย่าง
const lessons = Array.from({ length: 10 }, (_, i) => ({
  id: `lesson-${i + 1}`,
  title: `บทที่ ${i + 1}`,
  description: `คำอธิบายของบทเรียนที่ ${i + 1} ครอบคลุมหัวข้อหลักที่จำเป็นต่อการเรียนรู้.`,
  contents: [
    {
      type: 'video',
      label: `วิดีโอสอนบทที่ ${i + 1}`,
      duration: `${10 + i}:${(i * 2 + 30) % 60}`.padStart(5, '0'), // เช่น 12:34
      url: '#',
    },
    {
      type: 'pdf',
      label: `เอกสาร PDF บทที่ ${i + 1}`,
      pages: 12 + i * 2,
      url: '#',
    },
  ],
  subLessons: Array.from({ length: 3 }, (_, j) => ({
    id: `lesson-${i + 1}-sub-${j + 1}`,
    title: `บทที่ ${i + 1}.${j + 1}`,
    description: `รายละเอียดของบทย่อย ${i + 1}.${j + 1} ที่ขยายความรู้จากบทหลัก.`,
    attachments: [
      {
        type: 'pdf',
        label: 'Slide PDF',
        pages: 8 + j,
        url: '#',
      },
      {
        type: 'doc',
        label: 'คู่มือการเรียน',
        pages: 10 + j * 3,
        url: '#',
      },
    ],
  })),
}))

export default function LessonViewPage() {
  return (
    <PageContainer title="View Lesson">
      <div className="text-2xl font-bold text-indigo-700 dark:text-white mb-6 mt-10">
        ชื่อรายวิชา: วิทยาการคอมพิวเตอร์เบื้องต้น
      </div>

      <div className="space-y-6">
        {lessons.map((lesson) => (
          <CardContainer key={lesson.id} className="shadow-md">
            <div className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {lesson.title}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{lesson.description}</p>

            {/* 🔸 ไฟล์หลัก */}
            <div className="mb-4">
              {lesson.contents.map((content, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm text-blue-600 hover:underline cursor-pointer mb-1"
                >
                  {getIcon(content.type)}
                  <a href={content.url} target="_blank" rel="noopener noreferrer">
                    {content.label}
                  </a>
                  <span className="ml-2 text-gray-500 dark:text-gray-400 text-xs">
                    {content.type === 'video'
                      ? `(${content.duration} นาที)`
                      : `(${content.pages} หน้า)`}
                  </span>
                </div>
              ))}
            </div>

            {/* 🔸 บทย่อย */}
            <div className="ml-4 border-l-2 border-indigo-200 dark:border-indigo-600 pl-4 space-y-4">
              {lesson.subLessons.map((sub) => (
                <div key={sub.id} className="bg-gray-50 dark:bg-slate-800 p-3 rounded-md shadow-sm">
                  <div className="text-base font-medium text-gray-700 dark:text-gray-200">
                    {sub.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {sub.description}
                  </div>
                  <ul className="text-sm space-y-1">
                    {sub.attachments.map((file, idx) => (
                      <li key={idx} className="flex items-center text-blue-600 hover:underline">
                        {getIcon(file.type)}
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          {file.label}
                        </a>
                        <span className="ml-2 text-gray-500 dark:text-gray-400 text-xs">
                          ({file.pages} หน้า)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContainer>
        ))}
      </div>
    </PageContainer>
  )
}
