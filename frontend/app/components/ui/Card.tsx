'use client'

import Link from 'next/link'
import React from 'react'

type CardProps = {
  id: number
  imageUrl: string
  name: string
  instructor: string
  lessonCount: number
  hasFoundationTest: boolean
  fee: number
}

export default function Card({
  id,
  imageUrl,
  name,
  instructor,
  lessonCount,
  hasFoundationTest,
  fee,
}: CardProps) {
  return (
    <Link href={`/student/courses/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
          />
        </div>

        <div className="p-4 space-y-2">
          <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 line-clamp-2">
            {name}
          </h2>

          <p className="text-sm text-gray-500">{instructor}</p>

          <div className="flex flex-wrap text-sm text-gray-600 gap-2 mt-2">
            <span>📖 {lessonCount} บทเรียน</span>
            <span>•</span>
            <span>{hasFoundationTest ? 'มีสอบพื้นฐาน' : 'เริ่มเรียนได้เลย'}</span>
          </div>

          <div className="mt-2 font-semibold text-primary">
            {fee === 0 ? (
              <span className="text-green-600">ฟรี</span>
            ) : (
              <span>{fee.toLocaleString()} บาท</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
