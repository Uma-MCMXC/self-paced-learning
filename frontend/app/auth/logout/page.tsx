'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // ทำการล้าง session หรือ token (ถ้ามี)
    localStorage.removeItem('authToken') // ถ้าใช้ JWT
    sessionStorage.removeItem('user') // ถ้าเก็บ session

    // Redirect ไปหน้า Login หลังจาก 3 วินาที
    const timeout = setTimeout(() => {
      router.push('/') // เปลี่ยน URL ตามหน้า Login ที่ต้องการ
    }, 1000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold">Logging out...</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2">You will be redirected shortly.</p>
      <div className="mt-6">
        <span className="loading loading-spinner loading-lg text-gray-600 dark:text-gray-400"></span>
      </div>
    </div>
  )
}
