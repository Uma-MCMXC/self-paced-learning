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
  TagIcon,
  ClipboardDocumentCheckIcon,
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
    student: [
      { label: 'Dashboard', href: '/student', icon: <HomeIcon className="w-5 h-5" /> },
      {
        label: 'Courses',
        href: '/student/courses/manage',
        icon: <BookOpenIcon className="w-5 h-5" />,
      },
      {
        label: 'My Courses',
        href: '/student/my-courses/manage',
        icon: <TagIcon className="w-5 h-5" />,
      },
      {
        label: 'My Tests',
        href: '/student/courses/manage',
        icon: <ClipboardDocumentCheckIcon className="w-5 h-5" />,
      },
    ],
    lecturer: [
      {
        label: 'Dashboard',
        href: '/lecturer',
        icon: <HomeIcon className="w-5 h-5" />,
      },
      {
        // หมวดหมู่
        label: 'Category',
        href: '/lecturer/category/manage',
        icon: <TagIcon className="w-5 h-5" />,
      },
      {
        // รายวิชาของฉัน
        label: 'Course',
        href: '/lecturer/course/manage',
        icon: <BookOpenIcon className="w-5 h-5" />,
      },
      {
        // บทเรียน
        label: 'Lessons',
        href: '/lecturer/lesson/manage',
        icon: <DocumentTextIcon className="w-5 h-5" />,
      },
      {
        // คำถาม - คำตอบ
        label: 'Questions',
        icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
        href: '/lecturer/question/question-set/manage',
      },
      {
        // นักเรียน
        label: 'Students',
        icon: <UserGroupIcon className="w-5 h-5" />,
        children: [
          { label: 'Student List', href: '/lecturer/students' },
          // ติดตามความคืบหน้า
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
                    setOpenMenus((prev) => {
                      const newState: Record<string, boolean> = {}
                      Object.keys(prev).forEach((key) => {
                        newState[key] = false
                      })
                      return newState
                    })
                  }}
                  className={`w-[210px] flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 dark:text-[#CAF0F8] ${
                    isActive ? 'bg-[#0077B6] text-white' : 'hover:bg-[#90E0EF] text-[#03045E]'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ) : (
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="flex items-center justify-between w-full px-4 py-2 text-[#03045E] dark:text-[#CAF0F8] hover:bg-[#90E0EF] dark:hover:bg-[#0077B6] rounded-xl transition"
                >
                  <span className="flex items-center gap-3 font-medium">
                    {item.icon}
                    {item.label}
                  </span>
                  {isOpen ? (
                    <ChevronDownIcon className="w-5 h-5 transition-transform duration-200 rotate-180" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5 transition-transform duration-200" />
                  )}
                </button>
              )}

              {isExpandable && isOpen && (
                <ul className="pl-6 mt-1 space-y-1 border-l border-[#00B4D8] dark:border-[#0077B6]">
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
                              ? 'text-white bg-[#0077B6]'
                              : 'text-[#0077B6] hover:bg-[#CAF0F8]'
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
