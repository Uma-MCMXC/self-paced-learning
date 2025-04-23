'use client'

import { useState } from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import CardContainer from '@/app/components/ui/CardContainer'
import TextareaInput from '@/app/components/ui/TextareaInput'
import FormInput from '@/app/components/ui/FormInput'
import SelectInput from '@/app/components/ui/SelectInput'
import MultiSelect from '@/app/components/ui/MultiSelect'
import Button from '@/app/components/ui/Button'

// Mock data - Replace with actual fetched data
const mockCourses = [
  { label: 'Introduction to Computer Science', value: 'course-1' },
  { label: 'Basic Mathematics', value: 'course-2' },
]

const mockLessons = [
  { label: 'Chapter 1: What is a Computer?', value: 'lesson-1' },
  { label: 'Chapter 2: Programming Basics', value: 'lesson-2' },
  { label: 'Chapter 3: Number Systems', value: 'lesson-3' },
]

const testTypes = [
  { label: 'Pre-test', value: 'Pre-test' },
  { label: 'Post-test', value: 'Post-test' },
  { label: 'Foundation', value: 'Foundation' },
  { label: 'Final', value: 'Final' },
]

const statuses = [
  { label: 'Draft', value: 'Draft' },
  { label: 'Published', value: 'Published' },
]

export default function CreateQuestionSetPage() {
  const [formData, setFormData] = useState({
    name: '',
    courseId: '',
    lessonId: '',
    testType: '',
    totalScore: '',
    status: 'Draft',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    console.log('Submitting form data:', formData)
    // TODO: Submit to API endpoint
  }

  const [form, setForm] = useState({
    description: '',
  })

  return (
    <PageContainer title="Create New Question Set">
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardContainer>
          <div className="grid grid-cols-2 gap-4">
            <SelectInput
              label="Course"
              name="course"
              options={mockCourses}
              value={formData.courseId}
              onChange={(val) => handleChange('courseId', val)}
              required
            />
            <SelectInput
              label="Lesson"
              name="lessonId"
              options={mockLessons}
              value={formData.lessonId}
              onChange={(val) => handleChange('lessonId', val)}
            />

            <SelectInput
              label="Test Type"
              name="testType"
              options={testTypes}
              value={formData.testType}
              onChange={(val) => handleChange('testType', val)}
              required
            />
            <SelectInput
              label="Status"
              name="status"
              options={statuses}
              value={formData.status}
              onChange={(val) => handleChange('status', val)}
            />

            <div className="col-span-full">
              <FormInput
                id="questionSetName"
                label="Question Set Name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                submitted={submitted}
              />
            </div>
            <div className="col-span-full">
              <TextareaInput
                id="description"
                label="Description"
                name="description"
                placeholder="Tell us about this question set"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                maxLength={5000}
              />
            </div>

            <div className="flex justify-end col-span-full">
              <Button type="submit" variant="success" label="Save Question Set" />
            </div>
          </div>
        </CardContainer>
      </form>
    </PageContainer>
  )
}
