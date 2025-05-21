'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/app/components/ui/Button'
import FormInput from '@/app/components/ui/FormInput'
import SelectInput from '@/app/components/ui/SelectInput'
import SectionTitle from '@/app/components/ui/SectionTitle'
import Badge from '@/app/components/ui/Badge'
import Modal from '@/app/components/ui/Modal'

// ใช้ TypeScript แบบมี organizationId สำหรับ division
type DivisionType = {
  id: number
  name: string
  organizationId: number
}

// ฟังก์ชันโหลดข้อมูลจาก API
export async function fetchTitles() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/titles`)
  return res.data
}
export async function fetchOrganization() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/organization`)
  return res.data
}
export async function fetchDivision(): Promise<DivisionType[]> {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/division`)
  return res.data
}

export default function StudentRegisterPage() {
  // จัดเก็บข้อมูลจาก API
  const [titles, setTitles] = useState<{ id: number; name: string }[]>([])
  const [organization, setOrganization] = useState<{ id: number; name: string }[]>([])
  const [division, setDivision] = useState<DivisionType[]>([])

  // จัดเก็บ error
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // เรียกใช้งาน router
  const router = useRouter()

  // เพิ่ม state สำหรับ modal email duplicate
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false)

  // เพิ่ม state สำหรับ modal success
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)

  // จัดเก็บค่าฟอร์ม
  const [form, setForm] = useState({
    titleId: '',
    firstName: '',
    lastName: '',
    email: '',
    organizationId: '',
    divisionId: '',
    password: '',
    confirmPassword: '',
  })

  // โหลดข้อมูลทั้งหมดเมื่อ component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [titlesRes, organizationRes, divisionRes] = await Promise.all([
          fetchTitles(),
          fetchOrganization(),
          fetchDivision(),
        ])
        setTitles(titlesRes)
        setOrganization(organizationRes)
        setDivision(divisionRes)
      } catch (err) {
        console.error('Error loading initial data:', err)
      }
    }

    loadData()
  }, [])

  // อัปเดตฟอร์มและตรวจรหัสผ่าน
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm((prev) => ({ ...prev, [name]: value }))

    // ตรวจสอบความยาว password
    if (name === 'password') {
      if (value.length < 8) {
        setPasswordError('Password must be at least 8 characters')
      } else {
        setPasswordError('')
      }

      // ตรวจสอบว่าตรงกับ confirmPassword หรือไม่
      if (form.confirmPassword && value !== form.confirmPassword) {
        setConfirmPasswordError('Passwords do not match')
      } else {
        setConfirmPasswordError('')
      }
    }

    if (name === 'confirmPassword') {
      if (value !== form.password) {
        setConfirmPasswordError('Passwords do not match')
      } else {
        setConfirmPasswordError('')
      }
    }
  }

  // ตรวจสอบฟอร์มและส่งข้อมูล
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}
    if (!form.titleId) newErrors.titleId = 'Please fill out this field.'
    if (!form.password || form.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters.'
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/students/register`, form)

      // เปิด modal success แทน alert
      setIsRegisterSuccess(true)
      const modal = document.getElementById('register-success-modal') as HTMLDialogElement
      if (modal) modal.showModal()
    } catch (err: any) {
      if (err.response?.data?.message === 'Email already in use') {
        // เปิด modal email duplicate แทน alert
        setIsEmailDuplicate(true)
        const modal = document.getElementById('email-duplicate-modal') as HTMLDialogElement
        if (modal) modal.showModal()
      } else {
        alert('Register failed')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-10">
        <div className="text-end justify-end">
          <Badge variant="primary" className="badge-lg">
            Register as Student
          </Badge>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="w-fit">
            <div className="relative w-[150px] aspect-square">
              <Image
                src="/uploads/logo/logo.png"
                alt="Self-Paced Learning Logo"
                fill
                className="object-contain"
                unoptimized
                priority
              />
            </div>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 🔐 Section: Account Credentials */}
          <div className="col-span-full mb-2">
            <SectionTitle title="Account Credentials" />
            <p className="text-sm text-gray-500">
              This email and password will be used to log in to the system.
            </p>
          </div>

          <div className="col-span-full">
            <FormInput
              name="email"
              id="email"
              type="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <FormInput
            name="password"
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <FormInput
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}

          {/* 🔹 Section: Student Info */}
          <div className="col-span-full mb-2 mt-6">
            <SectionTitle title="Student Profile" />
            <p className="text-sm text-gray-500">Please provide your basic personal information.</p>
          </div>

          {/* แสดง Title ที่ดึงมาจาก backend */}
          <div className="col-span-full">
            <SelectInput
              label="Title"
              name="titleId"
              value={form.titleId}
              onChange={(val) => {
                setForm((prev) => ({ ...prev, titleId: val }))
                if (val) setErrors((prev) => ({ ...prev, titleId: '' }))
              }}
              options={titles.map((t) => ({ label: t.name, value: String(t.id) }))}
              error={!!errors.titleId}
              errorMessage={errors.titleId}
            />
          </div>

          <FormInput
            name="firstName"
            id="firstName"
            label="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <FormInput
            name="lastName"
            id="lastName"
            label="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />

          <SelectInput
            label="Organization"
            name="organizationId"
            value={form.organizationId}
            onChange={(val) => {
              setForm((prev) => ({ ...prev, organizationId: val, divisionId: '' }))
              if (val) setErrors((prev) => ({ ...prev, organizationId: '', divisionId: '' }))
            }}
            options={organization.map((t) => ({ label: t.name, value: String(t.id) }))}
          />

          <SelectInput
            label="Division"
            name="divisionId"
            value={form.divisionId}
            onChange={(val) => {
              setForm((prev) => ({ ...prev, divisionId: val }))
              if (val) setErrors((prev) => ({ ...prev, divisionId: '' }))
            }}
            options={division
              .filter((d) => String(d.organizationId) === form.organizationId)
              .map((d) => ({ label: d.name, value: String(d.id) }))}
            disabled={!form.organizationId}
          />

          {/* ✅ Submit */}
          <div className="col-span-full mt-8 text-center">
            <Button label="Register" variant="info" size="lg" />
          </div>
        </form>
      </div>

      <Modal
        id="email-duplicate-modal"
        title="Email Already Registered"
        onClose={() => setIsEmailDuplicate(false)}
      >
        <p>This email is already in use. Please try another one.</p>
      </Modal>

      <Modal
        id="register-success-modal"
        title="Registration Completed"
        onClose={() => router.push('/auth/login')} // 👉 redirect หลังจากปิด modal
      >
        <p>You have successfully registered as a student.</p>
      </Modal>
    </div>
  )
}
