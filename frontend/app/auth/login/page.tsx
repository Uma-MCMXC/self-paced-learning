'use client'

import { useState } from 'react'
import Button from '@/app/components/ui/Button'
import FormInput from '@/app/components/ui/FormInput'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Logging in as ${email}`)
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
              />
            </Link>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Sign in to access your <strong>Self-Paced Learning</strong> account.
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="md:w-1/2 p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <FormInput
              type="email"
              id="email"
              label="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              required
            />

            <FormInput
              type="password"
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
              required
            />

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="text-sm text-blue-600 hover:underline cursor-pointer text-right">
              Forgot Password?
            </div>

            <Button label="Sign in" variant="primary" size="md" className="w-full" />
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">Don’t have an account?</p>
          <div className="mt-2 flex justify-center gap-4">
            <a
              href="/register/student"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Register as Student
            </a>
            <a
              href="/register/lecturer"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Register as Lecturer
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
