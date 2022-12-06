export function isValidLink(input: string) {
  let url: URL

  try {
    url = new URL(input)
  } catch (_) {
    return false
  }

  return /^https?/.test(url.protocol)
}

export function isValidBody<T extends Record<string, unknown>>(
  body: any,
  fields: (keyof T)[],
): body is T {
  if (Object.keys(body).length === 0) return false
  return Object.keys(body).every((key) => fields.includes(key))
}
