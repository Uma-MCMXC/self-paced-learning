'use client'

import { useParams } from 'next/navigation'
import PageContainer from '@/app/components/ui/PageContainer'
import Button from '@/app/components/ui/Button'
import CardContainer from '@/app/components/ui/CardContainer'
import SectionTitle from '@/app/components/ui/SectionTitle'
import { VideoCameraIcon, BookOpenIcon } from '@heroicons/react/24/outline'

const instructorName = 'Dr. Somchai Insuk'

const lessons = [
  {
    id: 1,
    name: 'Lesson 1: Introduction to Computers',
    type: 'video',
    duration: 1800,
    pages: 0,
    publishedAt: '2025-04-01',
  },
  {
    id: 2,
    name: 'Lesson 2: Components of a Computer',
    type: 'pdf',
    duration: 0,
    pages: 20,
    publishedAt: '2025-04-02',
  },
  {
    id: 3,
    name: 'Lesson 3: Storage Devices',
    type: 'video',
    duration: 1500,
    pages: 0,
    publishedAt: '2025-04-05',
  },
]

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  return `${minutes} min`
}

export default function CourseDetailPage() {
  const { courseId } = useParams()
  const coursePublishedAt = '2025-04-01'
  const fee: number = 0

  const courseIdNum = Number(courseId)

  const getActionButton = () => {
    if (courseIdNum === 1) {
      return (
        <Button
          variant="warning"
          label="Take Foundation Test"
          href={`/student/courses/${courseId}/foundation-test`}
        />
      )
    } else if (courseIdNum === 2) {
      return (
        <Button
          variant="info"
          label="Start Learning"
          href={`/student/courses/${courseId}/lessons/1`}
        />
      )
    } else {
      return null
    }
  }

  return (
    <PageContainer title="Introduction to Computer Science">
      <div className="space-y-10">
        {/* Cover */}
        <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src="/uploads/course/ex-course.png"
            alt="Course Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Course Info */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Introduction to Computer Science</h1>
            <p className="text-gray-600">Instructor: {instructorName}</p>
            <p className="text-gray-600">Category: Computer Science</p>
            <p className="text-gray-500">{lessons.length} Lessons • Self-paced</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-lg font-semibold text-green-600">
              {fee === 0 ? 'Free' : `฿${fee.toLocaleString()}`}
            </div>
            <p className="text-sm text-gray-400">Published: {coursePublishedAt}</p>
            {getActionButton()}
          </div>
        </div>

        {/* Lesson List */}
        <div className="mt-10">
          <SectionTitle title="All Lessons" />
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
            {lessons.map((lesson) => (
              <CardContainer key={lesson.id}>
                <div className="flex gap-4 items-center">
                  {/* Icon */}
                  <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-md flex-shrink-0">
                    {lesson.type === 'video' ? (
                      <VideoCameraIcon className="w-8 h-8 text-blue-500" />
                    ) : (
                      <BookOpenIcon className="w-8 h-8 text-green-500" />
                    )}
                  </div>

                  {/* Lesson Info */}
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800 leading-tight">{lesson.name}</h3>
                      <span className="text-xs text-gray-400">Published: {lesson.publishedAt}</span>
                    </div>

                    <div className="text-sm text-gray-500 mt-2">Instructor: {instructorName}</div>

                    <div className="flex items-center text-sm text-gray-500 mt-1 gap-2">
                      {lesson.type === 'video' ? (
                        <>
                          <span>Video</span>
                          <span>•</span>
                          <span>{formatDuration(lesson.duration)}</span>
                        </>
                      ) : (
                        <>
                          <span>Document</span>
                          <span>•</span>
                          <span>{lesson.pages} pages</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContainer>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
