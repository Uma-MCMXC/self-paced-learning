'use client'

import Button from './components/ui/Button'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-800">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center relative">
        <div className="absolute inset-0 bg-no-repeat bg-top bg-contain opacity-10 pointer-events-none"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-indigo-700 drop-shadow">
          Self-Paced Learning
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          แพลตฟอร์มการเรียนรู้แบบอิสระ พร้อมวัดผลความเข้าใจในแบบของคุณเอง
        </p>

        {/* Sign In */}
        <Button label="Sign in" variant="info" size="lg" href="/auth/login" />

        {/* Divider */}
        <div className="mt-10 mb-2 text-gray-400">or</div>

        {/* Register Options */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button
            label="Register as Student"
            variant="outline"
            size="md"
            href="/auth/register/student"
          />
          <Button
            label="Register as Lecturer"
            variant="outline"
            size="md"
            href="/auth/register/lecturer"
          />
        </div>

        {/* Demo Links */}
        <div className="flex flex-col md:flex-row gap-3 justify-center items-center mt-10">
          <Button label="Student Demo" variant="neutral" size="sm" href="/student" />
          <Button label="Lecturer Demo" variant="warning" size="sm" href="/lecturer" />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-100 text-gray-700 text-sm text-center p-4 border-t border-indigo-200">
        <p>
          Copyright © 2025 - All rights reserved by{' '}
          <a
            href="https://scidi.tsu.ac.th/"
            className="text-indigo-600 font-medium hover:underline"
            target="_blank"
          >
            สาขาวิชาคอมพิวเตอร์และเทคโนโลยีสารสนเทศ
          </a>
        </p>
      </footer>
    </div>
  )
}
