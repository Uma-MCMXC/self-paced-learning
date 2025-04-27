'use client'

import { useState } from 'react'
import * as ExcelJS from 'exceljs'
import PageContainer from '@/app/components/ui/PageContainer'
import CardContainer from '@/app/components/ui/CardContainer'
import SectionTitle from '@/app/components/ui/SectionTitle'
import FormInput from '@/app/components/ui/FormInput'
import TextareaInput from '@/app/components/ui/TextareaInput'
import FileInput from '@/app/components/ui/FileInput'
import SelectInput from '@/app/components/ui/SelectInput'
import Button from '@/app/components/ui/Button'
import Badge from '@/app/components/ui/Badge'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

const questionTypes = [
  { label: 'Multiple Choice', value: 'multiple' },
  { label: 'Fill in the Blank', value: 'fill_in_blank' },
  { label: 'Upload File', value: 'upload_file' },
]

const difficultyLevels = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
]

const mockQuestionSetName = 'Intro Set - Pre 1'

type Choice = {
  text: string
  isCorrect: boolean
}

type Question = {
  questionText: string
  questionType: string
  score: string
  difficulty: string
  choices: Choice[]
  answer?: string
  attachment?: File | null
  previewUrl?: string | null
  explanation?: string | null
}

export default function CreateMultipleQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      questionText: '',
      questionType: 'multiple',
      score: '',
      difficulty: 'easy',
      choices: [{ text: '', isCorrect: false }],
      answer: '',
      explanation: '',
    },
  ])

  const [showModal, setShowModal] = useState(false)

  const handleChange = (index: number, key: keyof Question, value: string) => {
    const updated = [...questions]
    updated[index] = { ...updated[index], [key]: value }
    setQuestions(updated)
  }

  const handleChoiceChange = (
    qIndex: number,
    cIndex: number,
    key: keyof Choice,
    value: string | boolean
  ) => {
    const updated = [...questions]
    updated[qIndex].choices[cIndex] = { ...updated[qIndex].choices[cIndex], [key]: value }
    setQuestions(updated)
  }

  const addChoice = (qIndex: number) => {
    const updated = [...questions]
    updated[qIndex].choices.push({ text: '', isCorrect: false })
    setQuestions(updated)
  }

  const removeChoice = (qIndex: number, cIndex: number) => {
    const updated = [...questions]
    updated[qIndex].choices = updated[qIndex].choices.filter((_, i) => i !== cIndex)
    setQuestions(updated)
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: '',
        questionType: 'multiple',
        score: '',
        difficulty: 'easy',
        choices: [{ text: '', isCorrect: false }],
        answer: '',
        explanation: '',
      },
    ])
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const buffer = await file.arrayBuffer()
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(buffer)
    const worksheet = workbook.getWorksheet(1)

    const newQuestions: Question[] = []

    worksheet?.eachRow((row, rowIndex) => {
      if (rowIndex === 1) return // Skip header

      const questionText = row.getCell(1).value?.toString() || ''
      const questionType = row.getCell(2).value?.toString() || 'multiple'
      const difficulty = row.getCell(3).value?.toString() || 'easy'
      const score = row.getCell(4).value?.toString() || '1'
      const answerDataRaw = row.getCell(5).value?.toString() || ''

      let choices: Choice[] = []
      let answer = ''

      try {
        const parsed = JSON.parse(answerDataRaw)

        if (questionType === 'multiple') {
          if (Array.isArray(parsed)) {
            choices = parsed // กรณี [{ text, isCorrect }]
          } else if ('choices' in parsed && Array.isArray(parsed.choices)) {
            choices = parsed.choices
          }
        } else if (questionType === 'fill_in_blank') {
          if (typeof parsed === 'object' && 'answer' in parsed) {
            answer = parsed.answer
          }
        }
      } catch (err) {
        console.error('Invalid JSON in answer_data:', answerDataRaw)
      }

      newQuestions.push({
        questionText,
        questionType,
        difficulty,
        score,
        choices,
        answer,
      })
    })

    setQuestions(newQuestions)
    setShowModal(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting Questions:', questions)
  }

  return (
    <PageContainer title={`Create Questions for: ${mockQuestionSetName}`}>
      <div className="text-right mb-4">
        <Button
          type="button"
          variant="outline"
          label="Upload Questions"
          onClick={() => setShowModal(true)}
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Upload Questions (.xlsx)</h2>
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileUpload}
              className="mb-4 file-input file-input-bordered file-input-md w-full bg-white text-black border border-gray-300 text-md rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                label="Cancel"
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {questions.map((q, index) => (
          <CardContainer key={index}>
            <div className="flex justify-between items-center">
              <Badge variant="primary" className="badge-lg badge-outline mb-5">
                Question ID: {index + 1}
              </Badge>
              {questions.length > 1 && (
                <TrashIcon
                  onClick={() => removeQuestion(index)}
                  className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer"
                />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="col-span-full">
                <TextareaInput
                  id={`questionText-${index}`}
                  name="questionText"
                  label="Question Text"
                  placeholder="Tell us about yourself..."
                  value={q.questionText}
                  onChange={(e) => handleChange(index, 'questionText', e.target.value)}
                  maxLength={5000}
                />
              </div>
              <div className="col-span-full">
                <FileInput
                  label="Upload File (optional)"
                  accept="image/*"
                  onFileChange={(file) => {
                    const updated = [...questions]
                    if (file) {
                      updated[index].attachment = file
                      updated[index].previewUrl = URL.createObjectURL(file)
                    } else {
                      updated[index].attachment = null
                      updated[index].previewUrl = null
                    }
                    setQuestions(updated)
                  }}
                />

                {questions[index]?.previewUrl && (
                  <div className="mt-2">
                    <img
                      src={questions[index].previewUrl}
                      alt="Preview"
                      className="max-h-48 rounded border"
                    />
                  </div>
                )}
              </div>

              <SelectInput
                id={`questionType-${index}`}
                label="Question Type"
                name="questionType"
                value={q.questionType}
                options={questionTypes}
                onChange={(val) => handleChange(index, 'questionType', val)}
              />
              <SelectInput
                id={`difficulty-${index}`}
                label="Difficulty"
                name="difficulty"
                value={q.difficulty}
                options={difficultyLevels}
                onChange={(val) => handleChange(index, 'difficulty', val)}
              />
              <FormInput
                id={`score-${index}`}
                label="Score"
                name="score"
                type="number"
                value={q.score}
                onChange={(e) => handleChange(index, 'score', e.target.value)}
                required
              />

              <div className="col-span-full">
                <TextareaInput
                  id="explanation"
                  name="explanation"
                  label="Explanation"
                  placeholder="Tell us about yourself..."
                  value=""
                  onChange={(e) => handleChange(index, 'explanation', e.target.value)}
                  maxLength={5000}
                />
              </div>
            </div>

            {q.questionType === 'multiple' && (
              <div className="mt-4">
                <SectionTitle title="Answer Choices" />
                <p className="text-sm text-gray-500 mb-2">
                  Mark the correct choices. Students will see all options.
                </p>
                {q.choices.map((choice, cIndex) => (
                  <div key={cIndex} className="flex items-center gap-2 mb-2">
                    <FormInput
                      id={`choice-text-${index}-${cIndex}`}
                      name={`choice-text-${index}-${cIndex}`}
                      label=""
                      value={choice.text}
                      placeholder={`Choice ${cIndex + 1}`}
                      onChange={(e) => handleChoiceChange(index, cIndex, 'text', e.target.value)}
                      required
                    />
                    <input
                      type="checkbox"
                      checked={choice.isCorrect}
                      onChange={(e) =>
                        handleChoiceChange(index, cIndex, 'isCorrect', e.target.checked)
                      }
                      className="checkbox checkbox-success"
                    />
                    <TrashIcon
                      className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => removeChoice(index, cIndex)}
                    />
                  </div>
                ))}
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => addChoice(index)}
                    className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add Choice
                  </button>
                </div>
              </div>
            )}

            {q.questionType === 'fill_in_blank' && (
              <div className="mt-4">
                <SectionTitle title="Correct Answer" />
                <FormInput
                  id={`answer-${index}`}
                  label="Expected Answer (Student must match this)"
                  name="answer"
                  placeholder="e.g., photosynthesis"
                  value={q.answer || ''}
                  onChange={(e) => handleChange(index, 'answer', e.target.value)}
                  required
                />
              </div>
            )}

            <hr className="my-6 border-t border-dashed border-gray-300" />
          </CardContainer>
        ))}
        <div>
          <Button
            type="button"
            variant="outline"
            onClick={addQuestion}
            icon={<PlusIcon className="w-4 h-4" />}
            size="sm"
            label="Add Question"
          />
        </div>
        <div className="flex justify-center items-center pt-6 border-t border-gray-200 mt-10">
          <Button type="submit" variant="info" label="Save All Question" />
        </div>
      </form>
    </PageContainer>
  )
}
