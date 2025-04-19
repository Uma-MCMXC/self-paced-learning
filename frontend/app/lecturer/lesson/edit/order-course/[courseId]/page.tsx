'use client'

import React, { useState } from 'react'
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import PageContainer from '@/app/components/ui/PageContainer'
import CardContainer from '@/app/components/ui/CardContainer'
import Button from '@/app/components/ui/Button'
import { Bars3Icon, PencilSquareIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

type Lesson = { id: string; title: string }

const initialLessons: Lesson[] = [
  { id: '1.1', title: 'บทที่ 1' },
  { id: '1.2', title: 'บทที่ 2' },
  { id: '1.3', title: 'บทที่ 3' },
]

const courseTitle = 'Information Technology'

export default function EditLessonOrderPage() {
  const [items, setItems] = useState(initialLessons)

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id)
      const newIndex = items.findIndex((i) => i.id === over.id)
      setItems(arrayMove(items, oldIndex, newIndex))
    }
  }

  return (
    <PageContainer title="Edit Lesson Order">
      <div className="text-xl font-bold text-indigo-700 dark:text-white mb-6">
        Course: {courseTitle}
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {items.map((lesson) => (
              <SortableLessonCard key={lesson.id} id={lesson.id} title={lesson.title} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </PageContainer>
  )
}

function SortableLessonCard({ id, title }: { id: string; title: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <CardContainer
      ref={setNodeRef}
      style={style}
      className="shadow-md cursor-grab relative"
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-bold text-gray-800 dark:text-white">{title}</div>
          <div className="text-sm text-gray-500 dark:text-gray-300">#ID: {id}</div>
        </div>

        <div className="flex items-center gap-3 text-gray-400">
          {/* 🔹 Edit Button */}
          <Link href={`/lecturer/lesson/edit/${id}`} title="Edit Lesson">
            <PencilSquareIcon className="w-5 h-5 text-green-500 hover:text-green-700" />
          </Link>

          {/* 🔸 Drag Icon */}
          <Bars3Icon className="w-5 h-5" />
        </div>
      </div>
    </CardContainer>
  )
}
