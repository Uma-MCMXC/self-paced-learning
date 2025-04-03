'use client'

import AppLayout from '@/app/components/layout/AppLayout'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout userRole="student">{children}</AppLayout>
}
