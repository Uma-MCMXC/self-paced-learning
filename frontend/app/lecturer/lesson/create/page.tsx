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

type TopicLesson = {
  title: string
  description: string
  documentUrl: string
  videoUrl: string
  duration: string
  pages: string
  topicLessonContentTypeId?: string
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

  const [contentTypes, setContentTypes] = useState<{ id: number; name: string }[]>([])
  const [courseOptions, setCourseOptions] = useState<{ label: string; value: string }[]>([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [lessonTypes, setLessonTypes] = useState<LessonType[]>([])
  const [selectedLessonType, setSelectedLessonType] = useState('')
  const [topicLessons, setTopicLessons] = useState<TopicLesson[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/lesson-types`)
      .then((res) => res.json())
      .then(setLessonTypes)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const options = data
          .filter((c: any) => c.isActive)
          .map((c: any) => ({
            label: c.name,
            value: String(c.id),
          }))
        setCourseOptions(options)
      })
  }, [])

  useEffect(() => {
    const fetchContentTypes = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lesson-content-types`)
        const data = await res.json()

        // ตรวจสอบว่า data เป็น array ก่อน set
        if (Array.isArray(data)) {
          setContentTypes(data)
        } else {
          console.error('❌ contentTypes response is not an array:', data)
          setContentTypes([]) // fallback ป้องกันไม่ให้ map พัง
        }
      } catch (error) {
        console.error('❌ Failed to fetch contentTypes:', error)
        setContentTypes([])
      }
    }

    fetchContentTypes()
  }, [])

  const handleTopicLessonChange = (index: number, field: keyof TopicLesson, value: any) => {
    const updated = [...topicLessons]
    updated[index][field] = value
    setTopicLessons(updated)
  }

  const addTopicLesson = () => {
    setTopicLessons([
      ...topicLessons,
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

  const removeTopicLesson = (index: number) => {
    setTopicLessons(topicLessons.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')

    const mainLessonPayload = {
      lesson_type_id: Number(selectedLessonType),
      course_id: Number(selectedCourse),
      name: mainLessonTitle,
      description: mainLessonDescription,
      image_url: '',
      duration: mainLessonDuration,
      pages: mainLessonPages,
      is_active: true,
    }

    if (mainLessonFile) {
      const formData = new FormData()
      formData.append('file', mainLessonFile)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload?type=lesson`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      const data = await res.json()
      mainLessonPayload.image_url = data.url
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lessons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mainLessonPayload),
    })

    const createdLesson = await res.json()
    const parentLessonId = createdLesson.id

    for (const [index, topic] of topicLessons.entries()) {
      let topicImageUrl = ''

      if (topic.file) {
        const topicFormData = new FormData()
        topicFormData.append('file', topic.file)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload?type=lesson`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: topicFormData,
        })
        const data = await res.json()
        topicImageUrl = data.url
      }

      const topicPayload = {
        lesson_type_id: Number(selectedLessonType),
        course_id: Number(selectedCourse),
        name: topic.title,
        description: topic.description,
        image_url: topicImageUrl,
        sort_order: index + 1,
        parent_id: parentLessonId,
        is_active: true,
        duration: topic.duration,
        pages: topic.pages,
        content_type_id: topic.topicLessonContentTypeId
          ? Number(topic.topicLessonContentTypeId)
          : null,
      }

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lessons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(topicPayload),
      })
    }

    alert('✅ Lesson created successfully!')
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

          {/* <div className="col-span-full">
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
          /> */}
        </div>
      </CardContainer>

      <div>
        {topicLessons.map((sub, i) => (
          <CardContainer key={i}>
            <div className="flex justify-between items-center mb-3">
              <div className="text-lg font-semibold text-indigo-700">Topic-lesson {i + 1}</div>
              <button
                type="button"
                className="text-sm text-red-500 hover:underline"
                onClick={() => removeTopicLesson(i)}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>

            <FormInput
              id={`topicLessonTitle-${i}`}
              name={`topicLessonTitle-${i}`}
              label="Topic-lesson Title"
              value={sub.title}
              onChange={(e) => handleTopicLessonChange(i, 'title', e.target.value)}
            />

            <TextareaInput
              id={`topicLessonDescription-${i}`}
              name={`topicLessonDescription-${i}`}
              label="Topic-lesson Description"
              value={sub.description}
              onChange={(e) => handleTopicLessonChange(i, 'description', e.target.value)}
            />

            <SelectInput
              id={`topicLessonContentType-${i}`}
              name={`topicLessonContentType-${i}`}
              label="Lesson Content Type"
              value={sub.topicLessonContentTypeId || ''}
              onChange={(val) => handleTopicLessonChange(i, 'topicLessonContentTypeId', val)}
              options={contentTypes.map((ct) => ({
                label: ct.name,
                value: String(ct.id),
              }))}
            />

            {Number(sub.topicLessonContentTypeId) === 1 && (
              <>
                <FormInput
                  id={`topicLessonVideoUrl-${i}`}
                  name={`topicLessonVideoUrl-${i}`}
                  label="Video URL"
                  value={sub.videoUrl}
                  onChange={(e) => handleTopicLessonChange(i, 'videoUrl', e.target.value)}
                />

                <FormInput
                  id={`topicLessonDuration-${i}`}
                  name={`topicLessonDuration-${i}`}
                  label="Duration (Time)"
                  type="number"
                  value={sub.duration}
                  onChange={(e) => handleTopicLessonChange(i, 'duration', e.target.value)}
                />
              </>
            )}

            {Number(sub.topicLessonContentTypeId) === 2 && (
              <>
                <FileInput
                  label="Upload File"
                  onFileChange={(file) => handleTopicLessonChange(i, 'file', file)}
                />

                <FormInput
                  id={`topicLessonPages-${i}`}
                  name={`topicLessonPages-${i}`}
                  label="Number of Pages"
                  type="number"
                  value={sub.pages}
                  onChange={(e) => handleTopicLessonChange(i, 'pages', e.target.value)}
                />
              </>
            )}
          </CardContainer>
        ))}

        <div className="mt-3">
          <Button label="Add Topic-lesson" variant="success" size="sm" onClick={addTopicLesson} />
        </div>
      </div>

      <div className="mt-10 flex justify-center ">
        <Button label="Save Lesson" variant="info" onClick={handleSubmit} />
      </div>
    </PageContainer>
  )
}
