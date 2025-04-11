'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Button from '@/app/components/ui/Button'
import FormInput from '@/app/components/ui/FormInput'
import SelectInput from '@/app/components/ui/SelectInput'
import SectionTitle from '@/app/components/ui/SectionTitle'
import RadioGroupInput from '@/app/components/ui/RadioGroupInput'
export default function LecturerRegisterPage() {
  const [form, setForm] = useState({
    titleId: '',
    academicTitle: '',
    firstName: '',
    lastName: '',
    email: '',
    facultyId: '',
    courseId: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      alert('❌ Passwords do not match')
      return
    }

    console.log('✅ Registering:', form)
    // TODO: ส่งข้อมูลไป backend
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="w-fit">
            <Image
              src="/uploads/logo/logo.png"
              alt="Self-Paced Learning Logo"
              width={160}
              height={160}
              className="mb-4 cursor-pointer"
              unoptimized
            />
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 🔐 Section: Account Credentials */}
          <div className="col-span-full mb-2">
            <SectionTitle>Account Credentials</SectionTitle>
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

          {/* 🔹 Section: Lecturer Info */}
          <div className="col-span-full mb-2 mt-6">
            <SectionTitle>Lecturer Profile</SectionTitle>
            <p className="text-sm text-gray-500">Please provide your basic personal information.</p>
          </div>

          <SelectInput
            label="Title"
            name="titleId"
            value={form.titleId}
            onChange={(val) => setForm((prev) => ({ ...prev, titleId: val }))}
            required
            options={[
              { label: 'นาย', value: '1' },
              { label: 'นาง', value: '2' },
              { label: 'นางสาว', value: '3' },
            ]}
          />
          <SelectInput
            label="Academic Title"
            name="academicTitle"
            value={form.academicTitle}
            onChange={(val) => setForm((prev) => ({ ...prev, academicTitle: val }))}
            required
            options={[
              { label: 'อ.', value: '1' },
              { label: 'อ.ดร', value: '2' },
              { label: 'อ.ผศ.', value: '3' },
              { label: 'อ.รศ.', value: '4' },
              { label: 'อ.ศ.', value: '5' },
              { label: 'ผศ.ดร.', value: '6' },
              { label: 'รศ.ดร.', value: '7' },
              { label: 'ศ.ดร.', value: '8' },
            ]}
          />

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
            label="Faculty"
            name="facultyId"
            value={form.facultyId}
            onChange={(val) => setForm((prev) => ({ ...prev, facultyId: val }))}
            required
            options={['1', '2', '3', '4', '5', '6'].map((f) => ({
              label: `Faculty ${f}`,
              value: f,
            }))}
          />

          <SelectInput
            label="Course"
            name="courseId"
            value={form.courseId}
            onChange={(val) => setForm((prev) => ({ ...prev, courseId: val }))}
            required
            options={['1', '2', '3', '4', '5', '6'].map((c) => ({
              label: `Course ${c}`,
              value: c,
            }))}
          />

          {/* ✅ Submit */}
          <div className="col-span-full mt-8 text-center">
            <Button label="Register" variant="info" size="lg" />
          </div>
        </form>
      </div>
    </div>
  )
}
