'use client'

import PageContainer from '@/app/components/ui/PageContainer'
import CardContainer from '@/app/components/ui/CardContainer'
import SectionTitle from '@/app/components/ui/SectionTitle'
import FormInput from '@/app/components/ui/FormInput'
import SelectInput from '@/app/components/ui/SelectInput'
import TextareaInput from '@/app/components/ui/TextareaInput'
import Button from '@/app/components/ui/Button'
import RadioGroupInput from '@/app/components/ui/RadioGroupInput'
import FileInput from '@/app/components/ui/FileInput'
import Toast from '@/app/components/ui/Toast'
import { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'

export default function CreateCourse() {
  const staffList = [
    { label: 'Dr. Alice', value: '1' },
    { label: 'Dr. Bob', value: '2' },
    { label: 'Dr. Carol', value: '3' },
  ]

  const [form, setForm] = useState({
    isInstructor: '1',
    courseName: '',
    courseFile: '',
    categoryId: '',
    description: '',
    staffId: '',
    staffName: '',
    role: '',
    isCurrentUserInstructor: false,
    courseFee: '0',
  })

  const [instructors, setInstructors] = useState<
    { role: string; staffId?: string; staffName?: string }[]
  >([])

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const validateForm = () => {
    const errors: { [key: string]: string } = {}
    if (!form.categoryId) errors.categoryId = 'This field is required'
    if (!form.courseName.trim()) errors.courseName = 'This field is required'
    return errors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm()
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return
    if (instructors.length === 0 && !form.isCurrentUserInstructor) {
      setToastMsg('Please add at least one instructor or mark yourself as instructor')
      return
    }
    console.log({ ...form, instructors })
  }

  const handleRadioChange = (val: string) => {
    setForm((prev) => ({ ...prev, isInstructor: val }))
  }

  const handleAddInstructor = () => {
    if (form.role === '') return setToastMsg('Please select role')
    if (form.isInstructor === '1' && form.staffId === '')
      return setToastMsg('Please select a staff member')
    if (form.isInstructor === '0' && form.staffName.trim() === '')
      return setToastMsg('Please enter a name')

    const newInstructor = {
      role: form.role,
      staffId: form.isInstructor === '1' ? form.staffId : undefined,
      staffName:
        form.isInstructor === '1'
          ? staffList.find((s) => s.value === form.staffId)?.label
          : form.staffName,
    }

    const isDuplicate = instructors.some(
      (inst) =>
        (inst.staffId && inst.staffId === newInstructor.staffId) ||
        (inst.staffName && inst.staffName === newInstructor.staffName)
    )
    if (isDuplicate) return setToastMsg('This instructor already exists.')

    setInstructors((prev) => [...prev, newInstructor])
    setForm((prev) => ({ ...prev, staffId: '', staffName: '', role: '' }))
  }

  useEffect(() => {
    const currentUserInstructor = {
      role: '1',
      staffId: 'me',
      staffName: 'You',
    }
    const alreadyExists = instructors.some((inst) => inst.staffId === 'me')
    if (form.isCurrentUserInstructor && !alreadyExists) {
      setInstructors((prev) => [...prev, currentUserInstructor])
    } else if (!form.isCurrentUserInstructor && alreadyExists) {
      setInstructors((prev) => prev.filter((inst) => inst.staffId !== 'me'))
    }
  }, [form.isCurrentUserInstructor])

  useEffect(() => {
    if (toastMsg) {
      const timeout = setTimeout(() => setToastMsg(null), 3000)
      return () => clearTimeout(timeout)
    }
  }, [toastMsg])

  const [courseFile, setCourseFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)

  return (
    <PageContainer title="Create Course">
      {toastMsg && <Toast message={toastMsg} type="error" />}
      <CardContainer>
        <SectionTitle title="Input Course Information" />
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <SelectInput
              label="Category"
              name="categoryId"
              value={form.categoryId}
              onChange={(val) => setForm((prev) => ({ ...prev, categoryId: val }))}
              required
              options={[
                { label: 'Computer Science', value: '1' },
                { label: 'Information Technology', value: '2' },
                { label: 'Software Engineering', value: '3' },
              ]}
              error={formErrors.categoryId}
            />
            <FormInput
              name="courseName"
              id="courseName"
              type="text"
              label="Course Name"
              value={form.courseName}
              onChange={handleChange}
              required
              error={formErrors.courseName}
            />
            <FileInput
              label="Upload Image"
              onFileChange={(file) => setCourseFile(file)}
              required
              submitted={submitted}
            />
            <FormInput
              name="courseFee"
              id="courseFee"
              type="number"
              label="Course Fee"
              value={form.courseFee}
              onChange={handleChange}
              required
              error={formErrors.courseFee}
            />
            <div className="col-span-full">
              <TextareaInput
                id="description"
                label="Description"
                name="description"
                placeholder="Tell us about yourself..."
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                maxLength={5000}
              />
            </div>
          </div>

          <fieldset className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-6">
            <legend className="text-lg font-semibold text-gray-700 dark:text-white">
              Add Instructor
            </legend>
            <div className="flex items-center gap-4 mb-4">
              <RadioGroupInput
                name="isInstructor"
                label=""
                value={form.isInstructor}
                onChange={handleRadioChange}
                options={[
                  { value: '1', label: 'Search from staff' },
                  { value: '0', label: 'Enter name' },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SelectInput
                label="Role"
                name="role"
                value={form.role}
                onChange={(val) => setForm((prev) => ({ ...prev, role: val }))}
                options={[
                  { label: 'Owner', value: '1' },
                  { label: 'Co-Owner', value: '0' },
                ]}
              />
              <SelectInput
                label="Select from staff"
                name="staffId"
                value={form.staffId}
                onChange={(val) => setForm((prev) => ({ ...prev, staffId: val }))}
                disabled={form.isInstructor !== '1'}
                required={form.isInstructor === '1'}
                options={staffList}
              />
              <FormInput
                name="staffName"
                id="staffName"
                type="text"
                label="Or enter name"
                value={form.staffName}
                onChange={handleChange}
                disabled={form.isInstructor !== '0'}
                required={form.isInstructor === '0'}
              />
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={form.isCurrentUserInstructor}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, isCurrentUserInstructor: e.target.checked }))
                }
                className="mr-2"
              />
              <label className="text-sm text-gray-700 dark:text-gray-300">
                I am one of the instructors
              </label>
            </div>
            <div className="mt-4 text-end">
              <Button
                label="Add Instructor"
                variant="success"
                size="sm"
                onClick={handleAddInstructor}
                type="button"
              />
            </div>
            <div className="mt-6 space-y-2">
              {instructors.map((inst, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-gray-200 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-gray-800"
                >
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {inst.staffName || `Staff ID #${inst.staffId}`}
                    <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {inst.role === '1' ? 'Owner' : 'Co-Owner'}
                    </span>
                  </span>
                  <button
                    onClick={() => setInstructors((prev) => prev.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                    title="Remove"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </fieldset>
          <div className="mt-8 text-end">
            <Button label="Save Course" variant="info" size="md" />
          </div>
        </form>
      </CardContainer>
    </PageContainer>
  )
}
