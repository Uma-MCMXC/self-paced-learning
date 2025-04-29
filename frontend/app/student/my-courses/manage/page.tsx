'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageContainer from '@/app/components/ui/PageContainer'
import Card from '@/app/components/ui/Card'
import Badge from '@/app/components/ui/Badge'
import Progress from '@/app/components/ui/Progress'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

type Course = {
  id: number
  name: string
  description: string
  imageUrl: string
  instructor: string
  category: string
  fee: number
  hasFoundationTest: boolean
  lessonCount: number
  enrolled: boolean
  enrollmentCount: number
  progress: number
}

const courses: Course[] = [
  {
    id: 1,
    name: 'Introduction to Computer Science',
    description: 'Basic knowledge of computer science.',
    imageUrl: '/uploads/course/ex-course.png',
    instructor: 'Dr. Somchai Insuk',
    category: 'Computer Science',
    fee: 0,
    hasFoundationTest: true,
    lessonCount: 5,
    enrolled: true,
    enrollmentCount: 35,
    progress: 30,
  },
  {
    id: 2,
    name: 'Digital Marketing Basics',
    description: 'Learn the fundamentals of online marketing.',
    imageUrl: '/uploads/course/ex-course.png',
    instructor: 'Ms. Kanokporn Wattanakul',
    category: 'Business',
    fee: 0,
    hasFoundationTest: false,
    lessonCount: 6,
    enrolled: true,
    enrollmentCount: 10,
    progress: 70,
  },
]

export default function CourseListPage() {
  const [courseList] = useState<Course[]>(courses)

  return (
    <PageContainer title="My Courses">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseList.map((course) => (
          <div key={course.id} className="relative">
            <Link
              href={`/student/my-courses/learing/${course.id}`}
              key={course.id}
              className="relative block group hover:shadow-lg transition"
            >
              <Card
                header={
                  <div className="relative w-full h-44 overflow-hidden rounded-t-lg">
                    <img
                      src={course.imageUrl}
                      alt={course.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                }
                title={
                  <div className="flex items-center gap-1">
                    {course.name}
                    {course.enrolled && <CheckBadgeIcon className="w-5 h-5 text-green-500" />}
                  </div>
                }
                description={
                  <>
                    <div className="text-gray-700 dark:text-white">{course.instructor}</div>
                    <div className="text-gray-500 text-sm mt-1">
                      {course.lessonCount} lessons •{' '}
                      {course.hasFoundationTest ? 'Has Foundation Test' : 'Start Immediately'}
                    </div>
                    <div className="mt-1">
                      <Progress value={course.progress} max={100} label="Progress" />
                    </div>
                  </>
                }
                footer={
                  course.fee === 0 ? (
                    <Badge variant="success" className="badge-lg badge-dash">
                      Free
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="badge-lg badge-dash">
                      ฿{course.fee.toLocaleString()}
                    </Badge>
                  )
                }
              />
            </Link>
          </div>
        ))}
      </div>
    </PageContainer>
  )
}
