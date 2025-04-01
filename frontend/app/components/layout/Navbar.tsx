'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { FiUserCheck, FiMenu } from 'react-icons/fi'
import ThemeToggle from '../hooks/ThemeToggle'
export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 🆕 ข้อมูลผู้ใช้ (ทดสอบ)
  const [user] = useState({
    name: 'John Doe',
    role: 'Lecturer',
    email: 'johndoe@example.com',
  })

  return (
    <div className="navbar bg-white dark:bg-gray-800 px-6 flex border-b border-gray-200 dark:border-gray-700">
      {/* ปุ่มเปิด Sidebar Drawer เฉพาะบนมือถือ */}
      <label htmlFor="sidebar-drawer" className="btn btn-ghost btn-circle lg:hidden">
        <FiMenu className="w-6 h-6" />
      </label>

      <div className="ml-auto flex items-center gap-3">
        <ThemeToggle /> {/* ✅ ปุ่มเปลี่ยนธีม */}
        <div className="relative" ref={dropdownRef}>
          {/* Avatar Button */}
          <button
            tabIndex={0}
            role="button"
            className="btn btn-ghost rounded-full bg-blue-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 px-4 py-2 normal-case transition-all duration-200 hover:shadow-md"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onBlur={(e) => {
              if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
                setIsDropdownOpen(false)
              }
            }}
          >
            <div className="w-8 h-8 rounded-full grid place-items-center">
              <FiUserCheck className="w-5 h-5 text-blue-700 dark:text-blue-400" />
            </div>
            <span className="hidden sm:block font-medium text-gray-700 dark:text-gray-200">
              {user.name}
            </span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <ul
              tabIndex={0}
              className="absolute right-0 bg-white dark:bg-gray-800 rounded-box z-20 mt-3 w-64 p-2 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <li className="p-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Role: {user.role}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Email: {user.email}</p>
              </li>
              <li>
                <a
                  href="/auth/logout"
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg block text-red-500 dark:text-red-400 font-medium"
                >
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
