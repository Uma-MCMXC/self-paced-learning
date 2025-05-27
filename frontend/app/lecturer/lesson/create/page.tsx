'use client'

import React, { useEffect, useState } from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import CardContainer from '@/app/components/ui/CardContainer'
import FormInput from '@/app/components/ui/FormInput'
import TextareaInput from '@/app/components/ui/TextareaInput'
import FileInput from '@/app/components/ui/FileInput'
import Button from '@/app/components/ui/Button'
import SelectInput from '@/app/components/ui/SelectInput'
import { TrashIcon } from '@heroicons/react/24/outline'

type LessonType = {
  id: number
  name: string
}

type SubLesson = {
  title: string
  description: string
  documentUrl: string
  videoUrl: string
  duration: string
  pages: string
  file: File | null
}

export default function CreateLessonPage() {
  const [mainLessonTitle, setMainLessonTitle] = useState('')
  const [mainLessonDescription, setMainLessonDescription] = useState('')
  const [mainLessonDocumentUrl, setMainLessonDocumentUrl] = useState('')
  const [mainLessonVideoUrl, setMainLessonVideoUrl] = useState('')
  const [mainLessonDuration, setMainLessonDuration] = useState('')
  const [mainLessonPages, setMainLessonPages] = useState('')
  const [mainLessonFile, setMainLessonFile] = useState<File | null>(null)

  const [courseOptions, setCourseOptions] = useState<{ label: string; value: string }[]>([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [lessonTypes, setLessonTypes] = useState<LessonType[]>([])
  const [selectedLessonType, setSelectedLessonType] = useState('')
  const [subLessons, setSubLessons] = useState<SubLesson[]>([])

  useEffect(() => {
    const fetchLessonTypes = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lesson-types`)
      const data = await res.json()
      setLessonTypes(data)
    }

    fetchLessonTypes()
  }, [])

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      const options = data
        .filter((c: any) => c.isActive)
        .map((c: any) => ({ label: c.name, value: String(c.id) }))
      setCourseOptions(options)
    }

    fetchCourses()
  }, [])

  const handleSubLessonChange = (index: number, field: keyof SubLesson, value: any) => {
    const updated = [...subLessons]
    updated[index][field] = value
    setSubLessons(updated)
  }

  const addSubLesson = () => {
    setSubLessons([
      ...subLessons,
      {
        title: '',
        description: '',
        documentUrl: '',
        videoUrl: '',
        duration: '',
        pages: '',
        file: null,
      },
    ])
  }

  const removeSubLesson = (index: number) => {
    setSubLessons(subLessons.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    const payload = {
      courseId: selectedCourse,
      lessonTypeId: selectedLessonType,
      mainLesson: {
        title: mainLessonTitle,
        description: mainLessonDescription,
        documentUrl: mainLessonDocumentUrl,
        videoUrl: mainLessonVideoUrl,
        duration: mainLessonDuration,
        pages: mainLessonPages,
        file: mainLessonFile,
      },
      subLessons,
    }

    console.log('📦 Payload:', payload)
    alert('Lesson submitted successfully!')
  }

  return (
    <PageContainer title="Create Lesson">
      <CardContainer>
        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            id="lessonType"
            name="lessonType"
            label="Lesson Type"
            value={selectedLessonType}
            onChange={setSelectedLessonType}
            options={lessonTypes.map((lt) => ({
              label: lt.name,
              value: String(lt.id),
            }))}
            required
          />

          <SelectInput
            id="courseId"
            name="courseId"
            label="Course"
            value={selectedCourse}
            onChange={setSelectedCourse}
            options={courseOptions}
            required
          />

          <div className="col-span-full">
            <FormInput
              id="mainLessonTitle"
              name="mainLessonTitle"
              label="Main Lesson Title"
              value={mainLessonTitle}
              onChange={(e) => setMainLessonTitle(e.target.value)}
            />
          </div>

          <div className="col-span-full">
            <TextareaInput
              id="mainLessonDescription"
              name="mainLessonDescription"
              label="Lesson Description"
              value={mainLessonDescription}
              onChange={(e) => setMainLessonDescription(e.target.value)}
              maxLength={5000}
            />
          </div>

          <div className="col-span-full">
            <FormInput
              id="mainLessonDocumentUrl"
              name="mainLessonDocumentUrl"
              label="Document URL"
              value={mainLessonDocumentUrl}
              onChange={(e) => setMainLessonDocumentUrl(e.target.value)}
            />
          </div>

          <FormInput
            id="mainLessonVideoUrl"
            name="mainLessonVideoUrl"
            label="Video URL"
            value={mainLessonVideoUrl}
            onChange={(e) => setMainLessonVideoUrl(e.target.value)}
          />

          <FormInput
            id="mainLessonDuration"
            name="mainLessonDuration"
            label="Duration (Time)"
            type="number"
            value={mainLessonDuration}
            onChange={(e) => setMainLessonDuration(e.target.value)}
          />

          <FileInput label="Upload Main File" onFileChange={setMainLessonFile} />

          <FormInput
            id="mainLessonPages"
            name="mainLessonPages"
            label="Number of Pages"
            type="number"
            value={mainLessonPages}
            onChange={(e) => setMainLessonPages(e.target.value)}
          />
        </div>
      </CardContainer>

      <div>
        {subLessons.map((sub, i) => (
          <CardContainer key={i}>
            <div className="flex justify-between items-center mb-3">
              <div className="text-lg font-semibold text-indigo-700">Topic-lesson {i + 1}</div>
              <button
                type="button"
                className="text-sm text-red-500 hover:underline"
                onClick={() => removeSubLesson(i)}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>

            <FormInput
              id={`subTitle-${i}`}
              name={`subTitle-${i}`}
              label="Topic-lesson Title"
              value={sub.title}
              onChange={(e) => handleSubLessonChange(i, 'title', e.target.value)}
            />

            <TextareaInput
              id={`subDescription-${i}`}
              name={`subDescription-${i}`}
              label="Topic-lesson Description"
              value={sub.description}
              onChange={(e) => handleSubLessonChange(i, 'description', e.target.value)}
            />

            <FormInput
              id={`subDocumentUrl-${i}`}
              name={`subDocumentUrl-${i}`}
              label="Document URL"
              value={sub.documentUrl}
              onChange={(e) => handleSubLessonChange(i, 'documentUrl', e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                id={`subVideoUrl-${i}`}
                name={`subVideoUrl-${i}`}
                label="Video URL"
                value={sub.videoUrl}
                onChange={(e) => handleSubLessonChange(i, 'videoUrl', e.target.value)}
              />

              <FormInput
                id={`subDuration-${i}`}
                name={`subDuration-${i}`}
                label="Duration (Time)"
                type="number"
                value={sub.duration}
                onChange={(e) => handleSubLessonChange(i, 'duration', e.target.value)}
              />

              <FileInput
                label="Upload File"
                onFileChange={(file) => handleSubLessonChange(i, 'file', file)}
              />

              <FormInput
                id={`subPages-${i}`}
                name={`subPages-${i}`}
                label="Number of Pages"
                type="number"
                value={sub.pages}
                onChange={(e) => handleSubLessonChange(i, 'pages', e.target.value)}
              />
            </div>
          </CardContainer>
        ))}

        <div className="mt-3">
          <Button label="Add Topic-lesson" variant="success" size="sm" onClick={addSubLesson} />
        </div>
      </div>

      <div className="mt-10 flex justify-center ">
        <Button label="Save Lesson" variant="info" onClick={handleSubmit} />
      </div>
    </PageContainer>
  )
}
