'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Breadcrumbs() {
  const pathname = usePathname()

  const pathSegments = pathname.split('/').filter((segment) => segment !== '')

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/')
    const isLast = index === pathSegments.length - 1

    // ถ้าอยากแปลงชื่อ path เป็นชื่อสวย ๆ
    const display = segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())

    return (
      <li key={href} className="flex items-center text-sm text-gray-600">
        {!isLast ? (
          <>
            <Link href={href} className="hover:underline text-blue-600">
              {display}
            </Link>
            <ChevronRightIcon className="w-4 h-4 mx-1" />
          </>
        ) : (
          <span className="text-gray-400">{display}</span>
        )}
      </li>
    )
  })

  return (
    <nav className="mb-4" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-1">
        <li>
          <Link href="#" className="hover:underline text-blue-600">
            Home
          </Link>
          {breadcrumbs.length > 0 && <ChevronRightIcon className="w-4 h-4 mx-1 inline" />}
        </li>
        {breadcrumbs}
      </ol>
    </nav>
  )
}
