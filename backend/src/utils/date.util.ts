export function getNowInBangkok(): Date {
  const utcNow = new Date()
  const offsetMs = 7 * 60 * 60 * 1000
  return new Date(utcNow.getTime() + offsetMs)
}