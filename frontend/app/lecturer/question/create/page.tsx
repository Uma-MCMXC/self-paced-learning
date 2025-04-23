'use client'

import { useState } from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import CardContainer from '@/app/components/ui/CardContainer'
import FormInput from '@/app/components/ui/FormInput'
import SelectInput from '@/app/components/ui/SelectInput'
import TextareaInput from '@/app/components/ui/TextareaInput'
import Button from '@/app/components/ui/Button'
import FileInput from '@/app/components/ui/FileInput'

export default function CreateQuestionPage() {
  const [form, setForm] = useState({
    question_text: '',
    course_id: '',
    lesson_id: '',
    test_type_id: '',
    question_type_id: '',
    question_level_id: '',
    score: '',
    explanation: '',
    file_url: '',
  })

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ✅ call API or handle submission here
    console.log(form)
  }

  return (
    <PageContainer title="Create Question">
      <CardContainer>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextareaInput
            id="question_text"
            label="Question Text"
            value={form.question_text}
            onChange={(e) => handleChange('question_text', e.target.value)}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectInput
              id="course_id"
              label="Course"
              value={form.course_id}
              onChange={(val) => handleChange('course_id', val)}
              options={[{ label: 'Select', value: '' }] /* dynamic */}
              required
            />
            <SelectInput
              id="lesson_id"
              label="Lesson"
              value={form.lesson_id}
              onChange={(val) => handleChange('lesson_id', val)}
              options={[{ label: 'Select', value: '' }] /* dynamic */}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectInput
              id="test_type_id"
              label="Test Type"
              value={form.test_type_id}
              onChange={(val) => handleChange('test_type_id', val)}
              options={[
                { label: 'Foundation', value: '1' },
                { label: 'Pre', value: '2' },
              ]}
              required
            />
            <SelectInput
              id="question_type_id"
              label="Question Type"
              value={form.question_type_id}
              onChange={(val) => handleChange('question_type_id', val)}
              options={[
                { label: 'Choice', value: '1' },
                { label: 'Fill-in-the-Blank', value: '2' },
              ]}
              required
            />
            <SelectInput
              id="question_level_id"
              label="Difficulty Level"
              value={form.question_level_id}
              onChange={(val) => handleChange('question_level_id', val)}
              options={[
                { label: 'Easy', value: '1' },
                { label: 'Hard', value: '2' },
              ]}
              required
            />
          </div>

          <FormInput
            id="score"
            label="Score"
            type="number"
            value={form.score}
            onChange={(e) => handleChange('score', e.target.value)}
            required
          />

          <TextareaInput
            id="explanation"
            label="Explanation (Optional)"
            value={form.explanation}
            onChange={(e) => handleChange('explanation', e.target.value)}
          />

          <FileInput
            id="file_url"
            label="Attachment (Optional)"
            onChange={(file) => handleChange('file_url', file.name)}
          />

          <div className="pt-4">
            <Button type="submit" label="Save Question" variant="primary" size="lg" />
          </div>
        </form>
      </CardContainer>
    </PageContainer>
  )
}
