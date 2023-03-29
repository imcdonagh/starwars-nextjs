export function getInitials(name: string) {
  if (!name) return ''
  let space = name.lastIndexOf(' ')
  let initials = name[0].toUpperCase()
  if (space !== -1) initials += name[space + 1].toUpperCase()
  return initials
}

export function stringToHslColor(str: string, s: number, l: number) {
    let hash = 0
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    let h = Math.abs(hash % 360)
    return `hsl(${h},${s}%,${l}%)`
}

export function getPersonId(str: string) {
  const prefix = 'https://swapi.dev/api/people/'
  if (!str.startsWith(prefix)) return ''
  let path = str.substring(prefix.length)
  if (path.endsWith('/')) path = path.substring(0, path.length - 1)
  return path
}