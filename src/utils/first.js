export function first(list) {
  if (Array.isArray(list)) {
    const array = [...list]
    return array[0]
  }
  return undefined
}
