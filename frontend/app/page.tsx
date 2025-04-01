'use client'

import Button from './components/ui/Button'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 from-white to-base-200 text-gray-800">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
          Self-Paced Learning
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          แพลตฟอร์มสนับสนุนการเรียนรู้แบบอิสระ
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
      </main>

      {/* Footer */}
      <footer className="bg-base-300 text-base-content text-center p-4">
        <p>
          Copyright © 2025 - All rights reserved by{' '}
          <a
            href="https://scidi.tsu.ac.th/"
            className="text-blue-600 hover:underline"
            target="_blank"
          >
            สาขาวิชาคอมพิวเตอร์และเทคโนโลยีสารสนเทศ
          </a>
        </p>
      </footer>
    </div>
  )
}
