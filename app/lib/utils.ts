export function titleCase(str: string) {
  if (!str) {
    return ''
  }
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())
}
