'use client'

import Navbar from '../layout/Navbar'
import Sidebar from '../layout/Sidebar'

type UserRole = 'admin' | 'student' | 'lecturer'

type AppLayoutProps = {
  children: React.ReactNode
  userRole: UserRole
}

export default function AppLayout({ children, userRole }: AppLayoutProps) {
  return (
    <div className="drawer lg:drawer-open">
      {/* Toggle สำหรับ Mobile */}
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

      {/* Content Area */}
      <div className="drawer-content flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>

      {/* Sidebar Area */}
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <Sidebar userRole={userRole} />
      </div>
    </div>
  )
}
