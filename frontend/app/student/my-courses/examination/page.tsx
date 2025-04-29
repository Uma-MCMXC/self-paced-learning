'use client'

import { useState } from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import Button from '@/app/components/ui/Button'
import CardContainer from '@/app/components/ui/CardContainer'

type Question = {
  id: number
  type: 'choice' | 'fill'
  question: string
  choices?: string[]
}

const questions: Question[] = [
  {
    id: 1,
    type: 'choice',
    question: 'Which component is the brain of the computer?',
    choices: ['RAM', 'CPU', 'Hard Disk', 'Monitor'],
  },
  {
    id: 2,
    type: 'fill',
    question: 'The main circuit board of a computer is called the _______.',
  },
  {
    id: 3,
    type: 'choice',
    question: 'Which of the following is an input device?',
    choices: ['Printer', 'Speaker', 'Mouse', 'Monitor'],
  },
  {
    id: 4,
    type: 'fill',
    question: 'A _______ is a collection of web pages under a single domain.',
  },
  {
    id: 5,
    type: 'choice',
    question: 'What does “HTTP” stand for?',
    choices: [
      'HyperText Transfer Protocol',
      'HighText Transfer Protocol',
      'HyperText Transmission Process',
      'Hyper Transfer Text Platform',
    ],
  },
  {
    id: 6,
    type: 'fill',
    question: 'A _______ is a device that connects computers to a network.',
  },
  {
    id: 7,
    type: 'choice',
    question: 'Which file format is commonly used for web images?',
    choices: ['.exe', '.jpg', '.doc', '.pdf'],
  },
  {
    id: 8,
    type: 'fill',
    question: 'The _______ is the first page of a website.',
  },
  {
    id: 9,
    type: 'choice',
    question: 'Which language is used to style web pages?',
    choices: ['HTML', 'Python', 'CSS', 'Java'],
  },
  {
    id: 10,
    type: 'fill',
    question: '_______ is a spreadsheet program developed by Microsoft.',
  },
]

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = () => {
    console.log('Answers submitted:', answers)
    alert('Submitted!')
  }

  return (
    <PageContainer title="Quiz: Computer Basics">
      {questions.map((q, index) => (
        <CardContainer key={q.id}>
          <p className="font-medium">
            {index + 1}. {q.question}
          </p>
          {q.type === 'choice' ? (
            <div className="mt-2 space-y-1">
              {q.choices?.map((choice, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={choice}
                    checked={answers[q.id] === choice}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    className="mr-2"
                  />
                  {choice}
                </label>
              ))}
            </div>
          ) : (
            <input
              type="text"
              placeholder="Your answer"
              value={answers[q.id] || ''}
              onChange={(e) => handleChange(q.id, e.target.value)}
              className="mt-2 border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          )}
        </CardContainer>
      ))}
      <div className="mt-5 flex justify-center items-center">
        <Button variant="info" label="Submit Quiz" onClick={handleSubmit} />
      </div>
    </PageContainer>
  )
}
