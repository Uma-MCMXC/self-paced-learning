'use client'

import { useState } from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import CardContainer from '@/app/components/ui/CardContainer'
import SectionTitle from '@/app/components/ui/SectionTitle'
import FormInput from '@/app/components/ui/FormInput'
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
    },
  ])

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
      },
    ])
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting Questions:', questions)
  }

  return (
    <PageContainer title={`Create Questions for: ${mockQuestionSetName}`}>
      <form onSubmit={handleSubmit} className="space-y-10">
        {questions.map((q, index) => (
          <CardContainer key={index}>
            <div className="flex justify-between items-center">
              {/* <SectionTitle title={`Question ID: ${index + 1}`} /> */}
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

            <FormInput
              id={`questionText-${index}`}
              name="questionText"
              label="Question Text"
              value={q.questionText}
              onChange={(e) => handleChange(index, 'questionText', e.target.value)}
              placeholder="Enter question text..."
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
