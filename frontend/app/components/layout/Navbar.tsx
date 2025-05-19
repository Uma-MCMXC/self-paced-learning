'use client'

import { useEffect, useRef, useState } from 'react'
import { Bars3Icon, UserIcon } from '@heroicons/react/24/solid'
import ThemeToggle from '../hooks/ThemeToggle'
import { useRouter } from 'next/navigation'

type User = {
  name: string
  role: string
  email: string
}

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // 👉 โหลด user จาก localStorage ตอน mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Failed to parse user from localStorage:', e)
        localStorage.removeItem('user')
      }
    }
  }, [])

  // 👉 ฟังก์ชัน Logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  return (
    <div className="navbar bg-white dark:bg-gray-800 px-6 flex border-b border-gray-200 dark:border-gray-700">
      {/* 📱 ปุ่มเปิด Sidebar Drawer (เฉพาะจอเล็ก) */}
      <label htmlFor="sidebar-drawer" className="btn btn-ghost btn-circle lg:hidden">
        <Bars3Icon className="w-6 h-6" />
      </label>

      <div className="ml-auto flex items-center gap-3">
        <ThemeToggle />

        {/* 👤 User Dropdown */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              tabIndex={0}
              role="button"
              className="flex items-center gap-2 px-4 py-2 dark:bg-[#0077B6] rounded-full shadow-md hover:shadow-md transition-all duration-200"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onBlur={(e) => {
                if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
                  setIsDropdownOpen(false)
                }
              }}
            >
              <div className="w-8 h-8 rounded-full bg-[#90E0EF] dark:bg-[#00B4D8] grid place-items-center">
                <UserIcon className="w-5 h-5 text-[#03045E] dark:text-white" />
              </div>
              <span className="hidden sm:block font-medium text-[#03045E] dark:text-white">
                {user.name}
              </span>
            </button>

            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-64 z-20 bg-white dark:bg-[#003049] border border-gray-200 dark:border-[#0077B6] rounded-xl shadow-lg">
                <li className="px-4 py-3 border-b border-gray-100 dark:border-[#0077B6]">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Role: {user.role}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Email: {user.email}</p>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 dark:text-red-400 hover:bg-[#f3f4f6] dark:hover:bg-[#0077B6] rounded-b-xl transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
