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
import { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'
import { useParams } from 'next/navigation'

export default function EditCourse() {
  const rawParams = useParams()
  const courseId = Array.isArray(rawParams.courseId) ? rawParams.courseId[0] : rawParams.courseId

  // รายการ instructor ที่ระบบสามารถเลือกได้
  const [staffList, setStaffList] = useState<{ label: string; value: string }[]>([])

  // หมวดหมู่ course ทั้งหมด
  const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([])

  // สำหรับ preview ภาพเดิม
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null)

  // ค่าฟอร์มหลัก
  const [form, setForm] = useState({
    isInstructor: '1',
    courseName: '',
    courseFee: '',
    categoryId: '',
    description: '',
    staffId: '',
    staffName: '',
    role: '',
    isCurrentUserInstructor: false,
  })

  // รายชื่อผู้สอน
  const [instructors, setInstructors] = useState<
    { role: string; staffId?: string; staffName?: string }[]
  >([])

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [courseFile, setCourseFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)

  // ✅ โหลดข้อมูล course ตาม id
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()

        setForm({
          isInstructor: '1',
          courseName: data.name,
          courseFee: String(data.fee),
          categoryId: String(data.categoryId),
          description: data.description ?? '',
          staffId: '',
          staffName: '',
          role: '',
          isCurrentUserInstructor: false,
        })

        setExistingImageUrl(data.imageUrl ?? null)

        setInstructors(
          data.courseInstructor.map((i: any) => ({
            role: i.role === 'OWNER' ? '1' : '0',
            staffId: i.userId ? String(i.userId) : undefined,
            staffName: i.fullName,
          }))
        )
      } catch (err) {
        console.error('❌ Fetch course failed:', err)
      }
    }

    if (courseId) fetchCourse()
  }, [courseId])

  // ✅ โหลดหมวดหมู่ + staff
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setCategoryOptions(data.map((c: any) => ({ label: c.name, value: String(c.id) })))
    }

    const fetchStaff = async () => {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/instructors`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setStaffList(
        data.map((u: any) => ({ label: `${u.firstName} ${u.lastName}`, value: String(u.id) }))
      )
    }

    fetchCategories()
    fetchStaff()
  }, [])

  const validateForm = () => {
    const errors: { [key: string]: string } = {}
    if (!form.categoryId) errors.categoryId = 'This field is required'
    if (!form.courseName.trim()) errors.courseName = 'This field is required'
    if (!form.courseFee || isNaN(+form.courseFee)) errors.courseFee = 'Invalid fee'
    return errors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (val: string) => {
    setForm((prev) => ({ ...prev, isInstructor: val }))
  }

  const handleAddInstructor = () => {
    if (!form.role) return alert('Please select role')
    if (form.isInstructor === '1' && !form.staffId) return alert('Please select staff')
    if (form.isInstructor === '0' && !form.staffName.trim()) return alert('Please enter name')

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
    if (isDuplicate) return alert('This instructor already exists.')

    setInstructors((prev) => [...prev, newInstructor])
    setForm((prev) => ({ ...prev, staffId: '', staffName: '', role: '' }))
  }

  // ✅ อัปเดต instructor ที่ติ๊ก "ฉันเป็นผู้สอน"
  useEffect(() => {
    const currentUserInstructor = { role: '1', staffId: 'me', staffName: 'You' }
    const exists = instructors.some((i) => i.staffId === 'me')

    if (form.isCurrentUserInstructor && !exists) {
      setInstructors((prev) => [...prev, currentUserInstructor])
    } else if (!form.isCurrentUserInstructor && exists) {
      setInstructors((prev) => prev.filter((i) => i.staffId !== 'me'))
    }
  }, [form.isCurrentUserInstructor])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const errors = validateForm()
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return

    try {
      const token = localStorage.getItem('token')
      let imageUrl = existingImageUrl || ''

      if (courseFile) {
        const formData = new FormData()
        formData.append('file', courseFile)
        const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload?type=course`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        })
        const uploadData = await uploadRes.json()
        imageUrl = uploadData.url
      }

      const payload = {
        courseName: form.courseName,
        categoryId: +form.categoryId,
        description: form.description,
        courseFee: +form.courseFee,
        imageUrl,
        instructors: instructors.map((inst) => ({
          role: inst.role === '1' ? 'owner' : 'co-owner',
          staffId: inst.staffId,
          staffName: inst.staffName,
        })),
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Update failed')
      alert('Course updated successfully')
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/lecturer/course/manage`
    } catch (err) {
      console.error('❌ UPDATE COURSE ERROR:', err)
      alert('Error updating course')
    }
  }

  return (
    <PageContainer title="Edit Course">
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
              options={categoryOptions}
              error={!!formErrors.categoryId}
              errorMessage={formErrors.categoryId}
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
              label="Upload New Image (optional)"
              onFileChange={(file) => setCourseFile(file)}
              required={false}
              accept="image/*"
              submitted={submitted}
            />

            <FormInput
              name="courseFee"
              id="courseFee"
              type="number"
              label="Course Fee"
              value={form.courseFee ?? ''}
              onChange={handleChange}
              required
              error={formErrors.courseFee}
            />

            {/* ✅ แสดงภาพเดิม */}
            {existingImageUrl && (
              <div className="col-span-full">
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}${existingImageUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  View Current Image
                </a>
              </div>
            )}

            <div className="col-span-full">
              <TextareaInput
                id="description"
                label="Description (optional)"
                name="description"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                maxLength={5000}
              />
            </div>
          </div>

          {/* 🔽 Instructor Section */}
          <fieldset className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-6">
            <legend className="text-lg font-semibold text-gray-700 dark:text-white">
              Edit Instructor
            </legend>

            <RadioGroupInput
              name="isInstructor"
              label=""
              value={form.isInstructor}
              onChange={handleRadioChange}
              options={[
                { value: '1', label: 'Search from staff' },
                { value: '0', label: 'Enter name manually' },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
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

            <div className="text-end mt-4">
              <Button
                label="Add Instructor"
                variant="success"
                size="sm"
                onClick={handleAddInstructor}
              />
            </div>

            <div className="mt-4 space-y-2">
              {instructors.map((inst, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border px-4 py-2 rounded bg-gray-50 dark:bg-gray-800"
                >
                  <span className="text-sm text-gray-800 dark:text-white">
                    {inst.staffName}
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
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
            <Button label="Update Course" variant="info" size="md" type="submit" />
          </div>
        </form>
      </CardContainer>
    </PageContainer>
  )
}
