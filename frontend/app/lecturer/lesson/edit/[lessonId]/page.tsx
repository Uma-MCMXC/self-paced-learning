'use client'

import React, { useState } from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import CardContainer from '@/app/components/ui/CardContainer'
import FormInput from '@/app/components/ui/FormInput'
import TextareaInput from '@/app/components/ui/TextareaInput'
import FileInput from '@/app/components/ui/FileInput'
import Button from '@/app/components/ui/Button'
import SelectInput from '@/app/components/ui/SelectInput'
import {
  TrashIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// ✅ Define Topic interface
interface Topic {
  id: string
  title: string
  description: string
  file: File | null
  videoUrl: string
  documentUrl: string
  duration: string
  pages: string
  expanded: boolean
}

const sampleCourses = [
  { label: 'Computer Science', value: 'cs101' },
  { label: 'Artificial Intelligence', value: 'ai202' },
  { label: 'Cybersecurity Basics', value: 'cyb150' },
]

const sampleLessonType = [
  { label: 'Main Lesson', value: '1' },
  { label: 'Supplementary Lesson', value: '2' },
]

export default function EditLessonPage() {
  const [selectedCourse, setSelectedCourse] = useState('cs101')
  const [selectedLessonType, setSelectedLessonType] = useState('1')
  const [mainTitle, setMainTitle] = useState('บทที่ 1')
  const [mainDesc, setMainDesc] = useState('คำอธิบายบทเรียนหลัก')
  const [mainFile, setMainFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState('https://example.com/video')
  const [pdfUrl, setPdfUrl] = useState('https://example.com/doc')
  const [duration, setDuration] = useState('10')
  const [pages, setPages] = useState('15')

  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 'topic-1',
      title: 'หัวข้อย่อย 1',
      description: 'รายละเอียดหัวข้อย่อย 1',
      file: null,
      videoUrl: 'https://example.com/subvideo1',
      documentUrl: 'https://example.com/subdoc1',
      duration: '5',
      pages: '7',
      expanded: false,
    },
    {
      id: 'topic-2',
      title: 'หัวข้อย่อย 2',
      description: 'รายละเอียดหัวข้อย่อย 2',
      file: null,
      videoUrl: 'https://example.com/subvideo2',
      documentUrl: 'https://example.com/subdoc2',
      duration: '6',
      pages: '5',
      expanded: false,
    },
    {
      id: 'topic-3',
      title: 'หัวข้อย่อย 3',
      description: 'รายละเอียดหัวข้อย่อย 3',
      file: null,
      videoUrl: 'https://example.com/subvideo3',
      documentUrl: 'https://example.com/subdoc3',
      duration: '8',
      pages: '6',
      expanded: false,
    },
  ])

  const sensors = useSensors(useSensor(PointerSensor))

  // ✅ Fix: strictly type-safe handleTopicChange
  const handleTopicChange = <K extends keyof Topic>(index: number, field: K, value: Topic[K]) => {
    const updated = [...topics]
    updated[index][field] = value
    setTopics(updated)
  }

  const toggleExpand = (index: number) => {
    const updated = [...topics]
    updated[index].expanded = !updated[index].expanded
    setTopics(updated)
  }

  const addTopic = () => {
    setTopics([
      ...topics,
      {
        id: `topic-${topics.length + 1}`,
        title: '',
        description: '',
        file: null,
        videoUrl: '',
        documentUrl: '',
        duration: '',
        pages: '',
        expanded: false,
      },
    ])
  }

  const removeTopic = (index: number) => {
    setTopics(topics.filter((_, i) => i !== index))
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = topics.findIndex((i) => i.id === active.id)
      const newIndex = topics.findIndex((i) => i.id === over.id)
      setTopics(arrayMove(topics, oldIndex, newIndex))
    }
  }

  const handleSubmit = () => {
    console.log('Payload:', {
      course: selectedCourse,
      lessonType: selectedLessonType,
      main: { mainTitle, mainDesc, videoUrl, pdfUrl, duration, pages, file: mainFile },
      topics,
    })
  }

  // ✅ Refactored Topic card component
  function SortableTopicCard({
    index,
    topic,
    onExpandToggle,
    onRemove,
    onChange,
  }: {
    index: number
    topic: Topic
    onExpandToggle: () => void
    onRemove: () => void
    onChange: <K extends keyof Topic>(field: K, value: Topic[K]) => void
  }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: topic.id,
    })
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    }

    return (
      <CardContainer ref={setNodeRef} style={style} className="border border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <div className="text-lg font-semibold text-indigo-700">Topic-lesson {index + 1}</div>
          <div className="flex gap-3">
            <button onClick={onExpandToggle}>
              {topic.expanded ? (
                <ChevronDownIcon className="w-4 h-4" />
              ) : (
                <ChevronRightIcon className="w-4 h-4" />
              )}
            </button>
            <button onClick={onRemove}>
              <TrashIcon className="w-5 h-5 text-red-500" />
            </button>
            <Bars3Icon
              className="w-5 h-5 text-gray-400 cursor-move"
              {...attributes}
              {...listeners}
            />
          </div>
        </div>

        {topic.expanded && (
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-full">
              <FormInput
                id={`title-${index}`}
                name="title"
                label="Topic Title"
                value={topic.title}
                onChange={(e) => onChange('title', e.target.value)}
              />
            </div>
            <div className="col-span-full">
              <TextareaInput
                id={`desc-${index}`}
                name="description"
                label="Topic Description"
                value={topic.description}
                onChange={(e) => onChange('description', e.target.value)}
              />
            </div>
            <div className="col-span-full">
              <FormInput
                id={`doc-${index}`}
                name="documentUrl"
                label="Document URL"
                value={topic.documentUrl}
                onChange={(e) => onChange('documentUrl', e.target.value)}
              />
            </div>
            <FormInput
              id={`video-${index}`}
              name="videoUrl"
              label="Video URL"
              value={topic.videoUrl}
              onChange={(e) => onChange('videoUrl', e.target.value)}
            />

            <FormInput
              id={`dur-${index}`}
              name="duration"
              label="Duration (mins)"
              value={topic.duration}
              onChange={(e) => onChange('duration', e.target.value)}
            />
            <FileInput label="Upload File" onFileChange={(file) => onChange('file', file)} />
            <FormInput
              id={`pages-${index}`}
              name="pages"
              label="Pages"
              value={topic.pages}
              onChange={(e) => onChange('pages', e.target.value)}
            />
          </div>
        )}
      </CardContainer>
    )
  }

  return (
    <PageContainer title="Edit Lesson">
      <CardContainer className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            id="lesson-type"
            label="Lesson of Type"
            value={selectedLessonType}
            onChange={setSelectedLessonType}
            options={sampleLessonType}
          />
          <SelectInput
            id="course"
            label="Course"
            value={selectedCourse}
            onChange={setSelectedCourse}
            options={sampleCourses}
          />
          <div className="col-span-full">
            <FormInput
              name="mainTitle"
              id="mainTitle"
              label="Main Lesson Title"
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
            />
          </div>
          <div className="col-span-full">
            <TextareaInput
              name="mainDesc"
              id="mainDesc"
              label="Lesson Description"
              value={mainDesc}
              onChange={(e) => setMainDesc(e.target.value)}
            />
          </div>
          <div className="col-span-full">
            <FormInput
              name="pdfUrl"
              id="pdfUrl"
              label="Document URL"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
            />
          </div>
          <FormInput
            name="videoUrl"
            id="videoUrl"
            label="Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          <FormInput
            name="duration"
            id="duration"
            label="Duration (mins)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <FileInput label="Upload Main File" onFileChange={setMainFile} />
          <FormInput
            name="pages"
            id="pages"
            label="Number of Pages"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
          />
        </div>
      </CardContainer>

      <div className="mt-10">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={topics.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {topics.map((topic, i) => (
              <SortableTopicCard
                key={topic.id}
                index={i}
                topic={topic}
                onExpandToggle={() => toggleExpand(i)}
                onRemove={() => removeTopic(i)}
                onChange={(field, value) => handleTopicChange(i, field, value)} // ✅ สำคัญ!
              />
            ))}
          </SortableContext>
        </DndContext>

        <div className="mt-6">
          <Button label="Add Topic-lesson" variant="success" onClick={addTopic} />
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <Button label="Save Changes" variant="info" onClick={handleSubmit} />
      </div>
    </PageContainer>
  )
}
