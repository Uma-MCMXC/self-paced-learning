'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  BookOpenIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid'

type SidebarItem = {
  label: string
  icon: React.ReactElement
  href?: string
  targetBlank?: boolean
  children?: { label: string; href: string; targetBlank?: boolean }[]
}

type UserRole = 'admin' | 'student' | 'lecturer'

export default function Sidebar({ userRole }: { userRole: UserRole }) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => {
      const newState: Record<string, boolean> = {}

      // วนทุกเมนูที่มี children
      menuItems[userRole].forEach((item) => {
        if (item.children) {
          newState[item.label] = item.label === label ? !prev[item.label] : false
        }
      })

      return newState
    })
  }

  const menuItems: Record<UserRole, SidebarItem[]> = {
    admin: [{ label: 'Dashboard', href: '/admin', icon: <HomeIcon className="w-5 h-5" /> }],
    student: [{ label: 'Dashboard', href: '/student', icon: <HomeIcon className="w-5 h-5" /> }],
    lecturer: [
      {
        label: 'Dashboard',
        href: '/lecturer',
        icon: <HomeIcon className="w-5 h-5" />,
      },
      {
        label: 'My Subject',
        icon: <BookOpenIcon className="w-5 h-5" />,
        children: [
          { label: 'Create Subject', href: '/lecturer/create-subject' },
          { label: 'Manage Subject', href: '/lecturer/manage-subjects' },
        ],
      },
      {
        label: 'Lessons',
        icon: <DocumentTextIcon className="w-5 h-5" />,
        children: [
          { label: 'Add Lesson', href: '/lecturer/add-lesson' },
          { label: 'Manage Lessons', href: '/lecturer/lessons' },
        ],
      },
      {
        label: 'Quizzes',
        icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
        children: [
          { label: 'Create Quiz', href: '/lecturer/create-test' },
          { label: 'Test Results', href: '/lecturer/test-results' },
        ],
      },
      {
        label: 'Students',
        icon: <UserGroupIcon className="w-5 h-5" />,
        children: [
          { label: 'Student List', href: '/lecturer/students' },
          { label: 'Progress Tracking', href: '/lecturer/progress-tracking' },
        ],
      },
    ],
  }

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById('sidebar-drawer') as HTMLInputElement
    if (drawerCheckbox?.checked) drawerCheckbox.checked = false
  }

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-10 text-center text-gray-800 dark:text-white">
        Self-Paced Learning
      </h2>
      <ul className="menu space-y-2">
        {menuItems[userRole].map((item) => {
          const isActive = item.href && pathname === item.href
          const isExpandable = !!item.children
          const isOpen =
            openMenus[item.label] ?? item.children?.some((child) => pathname.startsWith(child.href))

          return (
            <li key={item.label} className="flex flex-col">
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={() => {
                    closeDrawer()

                    // พับเมนูย่อยทั้งหมดเมื่อกดเมนูหลักที่ไม่มี children
                    setOpenMenus((prev) => {
                      const newState: Record<string, boolean> = {}
                      Object.keys(prev).forEach((key) => {
                        newState[key] = false
                      })
                      return newState
                    })
                  }}
                  className={`w-[210px] flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ) : (
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="flex items-center justify-between w-full px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <span className="flex items-center gap-3 font-medium">
                    {item.icon}
                    {item.label}
                  </span>
                  {isOpen ? (
                    <ChevronDownIcon className="w-5 h-5" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5" />
                  )}
                </button>
              )}

              {isExpandable && isOpen && (
                <ul className="pl-6 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-600">
                  {item.children!.map((child) => {
                    const isChildActive = pathname === child.href
                    return (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={closeDrawer}
                          target={child.targetBlank ? '_blank' : undefined}
                          rel={child.targetBlank ? 'noopener noreferrer' : undefined}
                          className={`block px-2 py-1 rounded-md text-sm transition ${
                            isChildActive
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
