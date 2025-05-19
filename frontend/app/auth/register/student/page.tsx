'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/app/components/ui/Button'
import FormInput from '@/app/components/ui/FormInput'
import SelectInput from '@/app/components/ui/SelectInput'
import SectionTitle from '@/app/components/ui/SectionTitle'
import Badge from '@/app/components/ui/Badge'

// use api
export async function fetchTitles() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/titles`)
  return res.data
}
export async function fetchOrganization() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/organization`)
  return res.data
}

export default function StudentRegisterPage() {
  // api
  const [titles, setTitles] = useState<{ id: number; name: string }[]>([])
  const [organization, setOrganization] = useState<{ id: number; name: string }[]>([])

  const [form, setForm] = useState({
    titleId: '',
    firstName: '',
    lastName: '',
    email: '',
    organizationId: '',
    departmentId: '',
    password: '',
    confirmPassword: '',
  })

  // โหลด title จาก API เมื่อ component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [titlesRes, organizationRes] = await Promise.all([fetchTitles(), fetchOrganization()])
        setTitles(titlesRes)
        setOrganization(organizationRes)
      } catch (err) {
        console.error('Error loading initial data:', err)
      }
    }

    loadData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    console.log('✅ Registering:', form)
    // TODO: ส่งข้อมูลไป backend
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-10">
        <div className="text-end justify-end">
          <Badge variant="primary" className="badge-lg">
            Student
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
              onChange={(val) => setForm((prev) => ({ ...prev, titleId: val }))}
              required
              options={titles.map((t) => ({ label: t.name, value: String(t.id) }))}
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
            value={form.titleId}
            onChange={(val) => setForm((prev) => ({ ...prev, organizationId: val }))}
            required
            options={organization.map((t) => ({ label: t.name, value: String(t.id) }))}
          />

          <SelectInput
            label="Department"
            name="departmentId"
            value={form.departmentId}
            onChange={(val) => setForm((prev) => ({ ...prev, departmentId: val }))}
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
