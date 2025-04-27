'use client'

import { useState } from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import Button from '@/app/components/ui/Button'
import SimpleTable from '@/app/components/ui/SimpleTable'
import StatusToggleButton from '@/app/components/ui/StatusToggleButton'
import { EyeIcon, PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Toast from '@/app/components/ui/Toast'

const sampleQuestionSets = [
  {
    id: 'QS001',
    name: 'Intro Set - Pre 1',
    course: 'Introduction to Computer Science',
    lessons: 'Chapter 1: Algorithms and Flowcharts',
    testType: 'Pre-test',
    createdAt: '2025-04-10',
    status: 'active',
  },
  {
    id: 'QS002',
    name: 'Intro Set - Pre 2',
    course: 'Introduction to Computer Science',
    lessons: 'Chapter 2: Programming Basics',
    testType: 'Pre-test',
    createdAt: '2025-04-11',
    status: 'active',
  },
  {
    id: 'QS003',
    name: 'Intro Set - Pre 3',
    course: 'Introduction to Computer Science',
    lessons: 'Chapter 3: Number Systems',
    testType: 'Pre-test',
    createdAt: '2025-04-12',
    status: 'inactive',
  },
]

type ResultLevel = {
  id: number
  name: string
}
const mockResultLevels: ResultLevel[] = [
  { id: 1, name: 'Low' },
  { id: 2, name: 'Medium' },
  { id: 3, name: 'High' },
]

type ScoreCriteria = {
  questionSetId: string
  minScore: number
  maxScore: number
  resultLevelId: number
  description: string
}

export default function ManageQuestionSetPage() {
  const [questionSets, setQuestionSets] = useState(sampleQuestionSets)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null)
  const [open, setOpen] = useState(false)
  const [selectedQuestionSetId, setSelectedQuestionSetId] = useState<string | null>(null)

  // Modal form
  const [minScore, setMinScore] = useState('')
  const [maxScore, setMaxScore] = useState('')
  const [resultLevelId, setResultLevelId] = useState('')
  const [description, setDescription] = useState('')

  const [scoreCriteriaList, setScoreCriteriaList] = useState<ScoreCriteria[]>([])

  const toggleStatus = (id: string) => {
    setQuestionSets((prev) =>
      prev.map((qs) =>
        qs.id === id
          ? {
              ...qs,
              status: qs.status === 'inactive' ? 'active' : 'inactive',
            }
          : qs
      )
    )

    const updated = questionSets.find((qs) => qs.id === id)
    setToast({
      message: `Status changed to ${
        updated?.status === 'active' ? 'active' : 'inactive'
      } successfully.`,
      type: 'success',
    })
    setTimeout(() => setToast(null), 3000)
  }

  const handleCreateScoreCriteria = () => {
    if (!selectedQuestionSetId || !minScore || !maxScore || !resultLevelId) {
      alert('Please fill all required fields.')
      return
    }

    const newCriteria: ScoreCriteria = {
      questionSetId: selectedQuestionSetId,
      minScore: Number(minScore),
      maxScore: Number(maxScore),
      resultLevelId: Number(resultLevelId),
      description,
    }

    setScoreCriteriaList((prev) => [...prev, newCriteria])

    setToast({
      message: 'Score Criteria created successfully!',
      type: 'success',
    })

    // Reset and close modal
    setMinScore('')
    setMaxScore('')
    setResultLevelId('')
    setDescription('')
    setSelectedQuestionSetId(null)
    setOpen(false)

    setTimeout(() => setToast(null), 3000)
  }

  return (
    <PageContainer title="Manage Question Sets">
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="w-full">
        <div className="flex justify-end mb-5 gap-4">
          <Button
            label="Export Sample Question Template"
            icon={<PlusIcon />}
            variant="primary"
            size="md"
            href="/uploads/question/question_import_multiple_and_fillin.xlsx"
          />
          <Button
            label="Create New Question Set"
            icon={<PlusIcon />}
            variant="success"
            size="md"
            href="/lecturer/question/question-set/create"
          />
        </div>

        <SimpleTable
          thead={
            <tr>
              <th>#</th>
              <th>Set Name</th>
              <th>Course</th>
              <th className="min-w-[150px]">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          }
          data={questionSets.map((qs, index) => ({
            name: (
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{qs.name}</div>
                <div className="text-sm text-gray-500">{qs.testType}</div>
              </div>
            ),
            course: (
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{qs.course}</div>
                <div className="text-sm text-gray-500">{qs.lessons}</div>
                <div className="text-xs mt-2 text-gray-400">{qs.createdAt}</div>
              </div>
            ),
            status: (
              <StatusToggleButton
                status={qs.status === 'active' ? 'active' : 'inactive'}
                onClick={() => toggleStatus(qs.id)}
                title="Toggle status"
              />
            ),
            manage: (
              <div className="flex flex-col gap-4">
                {/* Actions for Question Set */}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-gray-400 dark:text-gray-300">
                    Question Sets:
                  </span>
                  <div className="flex items-center gap-3">
                    <Link href={`/lecturer/question-sets/${qs.id}`} title="View Details">
                      <EyeIcon className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
                    </Link>
                    <Link href={`/lecturer/question-sets/edit/${qs.id}`} title="Edit Question Set">
                      <PencilSquareIcon className="w-5 h-5 text-yellow-500 hover:text-yellow-700 cursor-pointer" />
                    </Link>
                    <button title="Delete">
                      <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
                    </button>
                  </div>
                </div>

                {/* Actions for Questions */}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-gray-400 dark:text-gray-300">
                    Questions:
                  </span>
                  <div className="flex items-center gap-3">
                    <Link href={`/lecturer/question//${qs.id}/questions`} title="Manage Questions">
                      <EyeIcon className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
                    </Link>
                    <Link
                      href={`/lecturer/question/question-bank/create/${qs.id}`}
                      title="Create Question"
                    >
                      <PlusIcon className="w-5 h-5 text-green-500 hover:text-green-700 cursor-pointer" />
                    </Link>
                  </div>
                </div>

                {/* Actions for Score Criteria */}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-gray-400 dark:text-gray-300">
                    Score Criteria:
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedQuestionSetId(qs.id)
                        setOpen(true)
                      }}
                      className="text-green-500 hover:text-green-700"
                    >
                      <PlusIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ),
            _isSubjectRow: false,
          }))}
        />
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create Score Criteria</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Score</label>
                <input
                  type="number"
                  value={minScore}
                  onChange={(e) => setMinScore(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Score</label>
                <input
                  type="number"
                  value={maxScore}
                  onChange={(e) => setMaxScore(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Result Level</label>
                <select
                  value={resultLevelId}
                  onChange={(e) => setResultLevelId(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="">Select...</option>
                  {mockResultLevels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="textarea textarea-bordered w-full"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setOpen(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateScoreCriteria}
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  )
}
