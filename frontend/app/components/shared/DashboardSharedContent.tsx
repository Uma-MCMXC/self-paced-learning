'use client'

import React from 'react'

type Props = {
  userRole: 'admin' | 'student' | 'lecturer'
}

export default function DashboardSharedContent({ userRole }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600">Welcome, {userRole}</p>

      {/* เนื้อหาเฉพาะของ dashboard สามารถมี logic ตาม role ได้ */}
      {userRole === 'student' && <p className="mt-2">นี่คือข้อมูลสำหรับนักศึกษา</p>}

      {userRole === 'admin' && <p className="mt-2">คุณสามารถจัดการระบบได้ที่นี่</p>}
    </div>
  )
}
