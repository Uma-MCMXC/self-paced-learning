// frontend/app/utils/user.util.tsx

type User = {
  firstName: string
  lastName: string
  academicTitle?: { name: string } | null
  title?: { name: string } | null
}

export type LecturerRaw = {
  fullName?: string | null
  user?: {
    firstName: string
    lastName: string
    academicTitle?: { name: string } | null
    title?: { name: string } | null
  } | null
}

export function getFullDisplayName(lecturer: LecturerRaw): string {
  if (!lecturer.user) {
    return lecturer.fullName ?? 'Unknown'
  }

  const prefix = lecturer.user.academicTitle?.name || lecturer.user.title?.name || ''
  return `${prefix} ${lecturer.user.firstName} ${lecturer.user.lastName}`.trim()
}
