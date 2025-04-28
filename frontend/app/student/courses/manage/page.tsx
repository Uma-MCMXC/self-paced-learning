'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageContainer from '@/app/components/ui/PageContainer'
import Card from '@/app/components/ui/Card'

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
}

const courses: Course[] = [
  {
    id: 1,
    name: 'Introduction to Computer Science',
    description: 'พื้นฐานความรู้ด้านคอมพิวเตอร์เบื้องต้น',
    imageUrl: '/uploads/course/ex-course.png',
    instructor: 'ดร.สมชาย อินทร์สุข',
    category: 'Computer Science',
    fee: 0,
    hasFoundationTest: true,
    lessonCount: 5,
    enrolled: false,
  },
  {
    id: 2,
    name: 'Digital Marketing Basics',
    description: 'เรียนรู้พื้นฐานการทำการตลาดออนไลน์',
    imageUrl: '/uploads/course/ex-course.png',
    instructor: 'อ.กนกพร วัฒนกุล',
    category: 'Business',
    fee: 1500,
    hasFoundationTest: false,
    lessonCount: 6,
    enrolled: true,
  },
]

export default function CourseListPage() {
  const [courseList] = useState<Course[]>(courses)

  return (
    <PageContainer title="Available Courses">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseList.map((course) => (
          <Card
            key={course.id}
            id={course.id}
            imageUrl={course.imageUrl}
            name={course.name}
            instructor={course.instructor}
            lessonCount={course.lessonCount}
            hasFoundationTest={course.hasFoundationTest}
            fee={course.fee}
          />
        ))}
      </div>
    </PageContainer>
  )
}
