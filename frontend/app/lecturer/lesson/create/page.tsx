'use client'

import React, { useState } from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import CardContainer from '@/app/components/ui/CardContainer'
import FormInput from '@/app/components/ui/FormInput'
import TextareaInput from '@/app/components/ui/TextareaInput'
import FileInput from '@/app/components/ui/FileInput'
import Button from '@/app/components/ui/Button'
import SelectInput from '@/app/components/ui/SelectInput'
import { TrashIcon } from '@heroicons/react/24/solid'

// 🔸 Dummy Course list
const sampleCourses = [
  { label: 'Computer Science', value: 'cs101' },
  { label: 'Artificial Intelligence', value: 'ai202' },
  { label: 'Cybersecurity Basics', value: 'cyb150' },
]

const sampleLessonType = [
  { label: 'Main Lesson', value: '1' },
  { label: 'Supplementary Lesson', value: '2' },
]

export default function CreateLessonPage() {
  const [selectedCourse, setSelectedCourse] = useState('')
  const [mainTitle, setMainTitle] = useState('')
  const [mainDesc, setMainDesc] = useState('')
  const [mainFile, setMainFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [pdfUrl, setPdfUrl] = useState('')
  const [subLessons, setSubLessons] = useState<
    {
      title: string
      description: string
      file: File | null
      videoUrl: string
      documentUrl: string
    }[]
  >([])

  const handleSubLessonChange = (
    index: number,
    field: keyof (typeof subLessons)[0],
    value: any
  ) => {
    const updated = [...subLessons]
    updated[index][field] = value
    setSubLessons(updated)
  }

  const addSubLesson = () => {
    setSubLessons([
      ...subLessons,
      { title: '', description: '', videoUrl: '', documentUrl: '', file: null },
    ])
  }

  const removeSubLesson = (index: number) => {
    const updated = subLessons.filter((_, i) => i !== index)
    setSubLessons(updated)
  }

  const handleSubmit = () => {
    const payload = {
      course: selectedCourse,
      main: {
        title: mainTitle,
        description: mainDesc,
        videoUrl,
        pdfUrl,
        file: mainFile,
      },
      subLessons,
    }
    console.log('Payload:', payload)
    alert('Lesson submitted successfully!')
  }

  return (
    <PageContainer title="Create Lesson">
      <CardContainer className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            id="course"
            label="Lesson of Type"
            value={selectedCourse}
            onChange={setSelectedCourse}
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
              id="mainTitle"
              name="mainTitle"
              label="Main Lesson Title"
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
            />
          </div>

          <div className="col-span-full">
            <TextareaInput
              id="mainDesc"
              name="mainDesc"
              label="Lesson Description"
              value={mainDesc}
              onChange={(e) => setMainDesc(e.target.value)}
              maxLength={5000}
            />
          </div>

          <div className="col-span-full">
            <FormInput
              id="pdfUrl"
              name="pdfUrl"
              label="Document URL"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
            />
          </div>

          <FormInput
            id="videoUrl"
            name="videoUrl"
            label="Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          <FormInput
            id="videoUrl"
            name="videoUrl"
            label="Duration (Time)"
            type="number"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          <FileInput label="Upload Main File" onFileChange={setMainFile} />

          <FormInput
            id="videoUrl"
            name="videoUrl"
            label="Number of Pages"
            type="number"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
      </CardContainer>

      <div className="mt-10 space-y-6">
        {subLessons.map((sub, i) => (
          <CardContainer key={i} className="border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <div className="text-lg font-semibold text-indigo-700">Topic-lesson {i + 1}</div>
              <button
                className="text-sm text-red-500 hover:underline"
                onClick={() => {
                  if (confirm('Are you sure you want to remove this sub-lesson?')) {
                    removeSubLesson(i)
                  }
                }}
              >
                {/* Remove Topic */}
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-full">
                <FormInput
                  id={`sub-title-${i}`}
                  name={`sub-title-${i}`}
                  label="Topic-lesson Title"
                  value={sub.title}
                  onChange={(e) => handleSubLessonChange(i, 'title', e.target.value)}
                />
              </div>
              <div className="col-span-full">
                <TextareaInput
                  id={`sub-desc-${i}`}
                  name={`sub-desc-${i}`}
                  label="Topic-lesson Description"
                  value={sub.description}
                  onChange={(e) => handleSubLessonChange(i, 'description', e.target.value)}
                  maxLength={5000}
                />
              </div>
              <div className="col-span-full">
                <FormInput
                  id={`sub-pdf-${i}`}
                  name={`sub-pdf-${i}`}
                  label="Document URL"
                  value={sub.documentUrl}
                  onChange={(e) => handleSubLessonChange(i, 'documentUrl', e.target.value)}
                />
              </div>
              <FormInput
                id={`sub-video-${i}`}
                name={`sub-video-${i}`}
                label="Video URL"
                value={sub.videoUrl}
                onChange={(e) => handleSubLessonChange(i, 'videoUrl', e.target.value)}
              />
              <FormInput
                id="videoUrl"
                name="videoUrl"
                label="Duration (Time)"
                type="number"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />

              <FileInput
                label="Upload File"
                onFileChange={(file) => handleSubLessonChange(i, 'file', file)}
              />
              <FormInput
                id="videoUrl"
                name="videoUrl"
                label="Number of Pages"
                type="number"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>
          </CardContainer>
        ))}
        <Button label="Add Topic-lesson" variant="success" size="sm" onClick={addSubLesson} />
      </div>

      <div className="mt-10 flex justify-end">
        <Button label="Save Lesson" variant="info" onClick={handleSubmit} />
      </div>
    </PageContainer>
  )
}
