import { jwtDecode } from 'jwt-decode'

type DecodedToken = {
  sub: number
  role: string
  exp: number
}

export function getUserIdFromToken(): number | null {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null

    const decoded = jwtDecode<DecodedToken>(token)
    return decoded.sub
  } catch (err) {
    return null
  }
}

export function getUserRoleFromToken(): string | null {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null

    const decoded = jwtDecode<DecodedToken>(token)
    return decoded.role
  } catch (err) {
    return null
  }
}
