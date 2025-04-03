// app/dashboard/page.tsx
'use client'

import DashboardSharedContent from '@/app/components/shared/DashboardSharedContent'

export default function DashboardPage() {
  return <DashboardSharedContent userRole="admin" />
}
