'use client'

import AppLayout from '@/app/components/layout/AppLayout'

export default function LecturerLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout userRole="lecturer">{children}</AppLayout>
}
