'use client'

import Button from './components/ui/Button'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-base-200 text-gray-800">
      {/* Main Content */}
      <main className="flex flex-col flex-1 items-center justify-center px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Self-Paced Learning</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          แพลตฟอร์มสนับสนุนการเรียนรู้แบบอิสระ
        </p>

        {/* Login Button */}
        <Button
          label="Login"
          variant="primary"
          size="lg"
          onClick={() => alert('Redirecting to PSU Passport')}
        />

        {/* ปุ่มเพิ่มเติม */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button
            label="Register as Student"
            variant="info"
            size="md"
            href="auth/register/student"
          />
          <Button
            label="Register as Lecturer"
            variant="info"
            size="md"
            href="auth/register/lecturer"
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
