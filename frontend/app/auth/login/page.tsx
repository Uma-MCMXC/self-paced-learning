'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Button from '@/app/components/ui/Button'
import FormInput from '@/app/components/ui/FormInput'
import Modal from '@/app/components/ui/Modal'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [errorMessage, setErrorMessage] = useState('')
  const errorModalRef = useRef<HTMLDialogElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: form.email,
        password: form.password,
      })

      const { access_token, user } = res.data

      if (!user || !access_token) {
        throw new Error('Invalid response from server')
      }

      localStorage.setItem('token', access_token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('userId', String(user.id))

      switch (user.role) {
        case 'admin':
          router.push('/admin')
          break
        case 'lecturer':
          router.push('/lecturer')
          break
        case 'student':
          router.push('/student')
          break
        default:
          router.push('/')
      }
    } catch (error: any) {
      const message =
        error?.response?.status === 401
          ? 'Invalid email or password. Please try again.'
          : error?.response?.data?.message || 'Unknown error occurred'

      setErrorMessage(message)
      errorModalRef.current?.showModal()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Left Panel */}
        <div className="md:w-1/2 bg-white p-8 flex flex-col justify-start">
          <div className="mb-8">
            <Link href="/" className="w-fit">
              <Image
                src="/uploads/logo/logo.png"
                alt="Self-Paced Learning Logo"
                width={130}
                height={130}
                className="mb-4 cursor-pointer"
                unoptimized
                priority
                style={{ height: 'auto' }}
              />
            </Link>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Sign in to access your <strong>Self-Paced Learning</strong> account.
            </p>
          </div>
        </div>

        {/* Right Panel: Form */}
        <div className="md:w-1/2 p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <FormInput
              name="email"
              id="email"
              label="E-Mail"
              value={form.email}
              onChange={handleChange}
              required
            />

            <FormInput
              name="password"
              id="password"
              label="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <div className="text-sm text-blue-600 hover:underline cursor-pointer text-right">
              Forgot Password?
            </div>

            <Button label="Sign in" variant="info" size="md" className="w-full" />
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">Don’t have an account?</p>
          <div className="mt-2 flex justify-center gap-4">
            <a
              href="/auth/register/student"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Register as Student
            </a>
            <a
              href="/auth/register/lecturer"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Register as Lecturer
            </a>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      <Modal
        id="loginErrorModal"
        ref={errorModalRef}
        title="Login Failed"
        size="sm"
        onClose={() => setErrorMessage('')}
      >
        <p>{errorMessage}</p>
      </Modal>
    </div>
  )
}
