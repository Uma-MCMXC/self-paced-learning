'use client'

// ฟอร์มสร้างคอร์สเรียน พร้อมอัปโหลดภาพและเพิ่มผู้สอน
import { useEffect, useState } from 'react'
import PageContainer from '@/app/components/ui/PageContainer'
import CardContainer from '@/app/components/ui/CardContainer'
import SectionTitle from '@/app/components/ui/SectionTitle'
import FormInput from '@/app/components/ui/FormInput'
import SelectInput from '@/app/components/ui/SelectInput'
import TextareaInput from '@/app/components/ui/TextareaInput'
import Button from '@/app/components/ui/Button'
import RadioGroupInput from '@/app/components/ui/RadioGroupInput'
import FileInput from '@/app/components/ui/FileInput'
import LoadingOverlay from '@/app/components/ui/LoadingOverlay'
import Toast from '@/app/components/ui/Toast'
import { TrashIcon } from '@heroicons/react/24/solid'

export default function CreateCourse() {
  // loading
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  // ดึงตัวเลือกหมวดหมู่จาก backend
  const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([])
  const [loadingCategory, setLoadingCategory] = useState(true)

  // ดึงรายชื่ออาจารย์จากระบบ
  const [staffList, setStaffList] = useState<{ label: string; value: string }[]>([])

  // เก็บ error และข้อความแจ้งเตือน
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  // ไฟล์ภาพที่ผู้ใช้เลือกอัปโหลด
  const [courseFile, setCourseFile] = useState<File | null>(null)

  // ข้อมูลของฟอร์มหลัก
  const [form, setForm] = useState({
    isInstructor: '1', // เลือกว่าจะดึงจาก staff (1) หรือกรอกเอง (0)
    courseName: '',
    categoryId: '',
    description: '',
    staffId: '',
    staffName: '',
    role: '',
    isCurrentUserInstructor: false,
    courseFee: '0',
  })

  // รายชื่อ instructor ที่ถูกเพิ่มเข้ามา
  const [instructors, setInstructors] = useState<
    { role: 'owner' | 'co-owner'; staffId?: string; staffName?: string }[]
  >([])

  // ตรวจสอบฟอร์มก่อน submit
  const validateForm = () => {
    const errors: { [key: string]: string } = {}
    if (!form.categoryId) errors.categoryId = 'Please select a category'
    if (!form.courseName.trim()) errors.courseName = 'Course name is required'
    if (!form.courseFee || isNaN(+form.courseFee)) errors.courseFee = 'Fee must be a number'
    return errors
  }

  // handle input form text
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // handle submit ทั้งหมด
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const errors = validateForm()
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return

    if (instructors.length === 0 && !form.isCurrentUserInstructor) {
      setToastMsg('Please add at least one instructor or mark yourself as instructor')
      return
    }

    setIsLoading(true) // เริ่มแสดงหน้า Loading

    try {
      const token = localStorage.getItem('token')
      const fullName = localStorage.getItem('fullName') || ''

      // อัปโหลดภาพถ้ามี
      let imageUrl = ''
      if (courseFile) {
        const formData = new FormData()
        formData.append('file', courseFile)
        const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload?type=course`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        })
        if (!uploadRes.ok) throw new Error('Upload failed')
        const uploadData = await uploadRes.json()
        imageUrl = uploadData.url
      }

      // จัด payload และส่งไป backend
      const payload = {
        ...form,
        courseFee: +form.courseFee,
        imageUrl,
        instructors,
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Failed to save course')

      setToastMsg('Course created successfully')

      // Reset form ทันทีหลังส่งข้อมูลสำเร็จ
      setForm({
        isInstructor: '1',
        courseName: '',
        categoryId: '',
        description: '',
        staffId: '',
        staffName: '',
        role: '',
        isCurrentUserInstructor: false,
        courseFee: '0',
      })
      setInstructors([])
      setCourseFile(null)
      setSubmitted(false)

      // แสดง loading เบลอก่อนเปลี่ยนหน้า
      setTimeout(() => {
        setIsRedirecting(true)
        setIsLoading(false) // ปิด loading หลักก่อน redirect
        setTimeout(() => {
          window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/../manage`
        }, 1000)
      }, 1000)
    } catch (err) {
      console.error(err)
      setToastMsg('Error saving course')
      setIsLoading(false)
    }
  }

  // handle radio input toggle
  const handleRadioChange = (val: string) => {
    setForm((prev) => ({ ...prev, isInstructor: val }))
  }

  // เพิ่ม instructor เข้า list
  const handleAddInstructor = () => {
    if (!form.role) return setToastMsg('Please select role')
    if (form.isInstructor === '1' && !form.staffId)
      return setToastMsg('Please select a staff member')
    if (form.isInstructor === '0' && !form.staffName.trim())
      return setToastMsg('Please enter a name')

    const newInstructor = {
      role: form.role as 'owner' | 'co-owner',
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

  // โหลดหมวดหมู่จาก backend
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategory(true)
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        const options = data
          .filter((c: any) => c.isActive)
          .map((c: any) => ({ label: c.name, value: String(c.id) }))
        setCategoryOptions(options)
      } catch {
        setToastMsg('Cannot load category data')
      } finally {
        setLoadingCategory(false)
      }
    }
    fetchCategories()
  }, [])

  // โหลดรายชื่อ staff
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/instructors`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        const options = data.map((u: any) => ({
          label: `${u.firstName} ${u.lastName}`,
          value: String(u.id),
        }))
        setStaffList(options)
      } catch {
        setToastMsg('Cannot load instructor list')
      }
    }
    fetchStaff()
  }, [])

  // ถ้าติ๊กว่า "ฉันเป็นผู้สอน" ให้เพิ่มตัวเองเข้า instructors
  useEffect(() => {
    const fullName = localStorage.getItem('fullName') || 'Me'
    const currentUser = { role: 'owner' as const, staffId: 'me', staffName: fullName }
    const exists = instructors.some((i) => i.staffId === 'me')

    if (form.isCurrentUserInstructor && !exists) {
      setInstructors((prev) => [...prev, currentUser])
    } else if (!form.isCurrentUserInstructor && exists) {
      setInstructors((prev) => prev.filter((i) => i.staffId !== 'me'))
    }
  }, [form.isCurrentUserInstructor])

  // toast หายไปอัตโนมัติใน 3 วินาที
  useEffect(() => {
    if (toastMsg) {
      const timeout = setTimeout(() => setToastMsg(null), 3000)
      return () => clearTimeout(timeout)
    }
  }, [toastMsg])

  return (
    <PageContainer title="Create Course">
      {toastMsg && (
        <Toast
          message={toastMsg}
          type={toastMsg === 'Course created successfully' ? 'success' : 'error'}
        />
      )}
      {(isLoading || isRedirecting) && (
        <LoadingOverlay message={isRedirecting ? 'Redirecting...' : 'Saving...'} />
      )}
      <CardContainer>
        <SectionTitle title="Input Course Information" />
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {loadingCategory ? (
              <div className="text-sm text-gray-500">Loading categories...</div>
            ) : (
              <SelectInput
                label="Category"
                name="categoryId"
                value={form.categoryId}
                onChange={(val) => setForm((prev) => ({ ...prev, categoryId: val }))}
                options={categoryOptions}
                required
                error={!!formErrors.categoryId}
                errorMessage={formErrors.categoryId}
              />
            )}

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
              accept="image/*"
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
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                maxLength={5000}
              />
            </div>
          </div>

          {/* Instructor Section */}
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
                  { label: 'Owner', value: 'owner' },
                  { label: 'Co-Owner', value: 'co-owner' },
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
                  className="flex items-center justify-between border px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-800"
                >
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {inst.staffName || `Staff ID #${inst.staffId}`}
                    <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {inst.role === 'owner' ? 'Owner' : 'Co-Owner'}
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

          <div className="mt-8 text-center">
            <Button label="Save Course" variant="info" size="md" type="submit" />
          </div>
        </form>
      </CardContainer>
    </PageContainer>
  )
}
