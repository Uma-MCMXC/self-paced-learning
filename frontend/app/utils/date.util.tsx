export function formatThaiDatetime(isoString: string): string {
  const rawDate = new Date(isoString)

  const date = rawDate.getUTCDate().toString().padStart(2, '0')
  const month = (rawDate.getUTCMonth() + 1).toString().padStart(2, '0')
  const year = (rawDate.getUTCFullYear() + 543).toString().slice(-2) // พ.ศ.
  const hour = rawDate.getUTCHours().toString().padStart(2, '0')
  const minute = rawDate.getUTCMinutes().toString().padStart(2, '0')

  return `${date}/${month}/${year}, ${hour}:${minute}`
}
