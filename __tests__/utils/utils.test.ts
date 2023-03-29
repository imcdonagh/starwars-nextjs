import { getInitials, stringToHslColor, getPersonId } from "@/utils/utils";

describe('getInitials', () => {
  it('returns empty initials for blank name', () => {
    expect(getInitials('')).toBe('')
  })

  it('returns one uppercase letter for first name only', () => {
    expect(getInitials('bob')).toBe('B')
  })

  it('returns two uppercase letters for first and last names', () => {
    expect(getInitials('bob jones')).toBe('BJ')
  })

  it('returns two uppercase letters for first and last names only', () => {
    expect(getInitials('bob fred jones')).toBe('BJ')
  })
})

describe('stringToHslColor', () => {
  it('returns correctly format HSL color', () => {
    const pattern = /^hsl\([\d]+,[\d]+%,[\d]+%\)$/
    expect(stringToHslColor('bob jones', 20, 30)).toMatch(pattern)
  })
})

describe('getPersonId', () => {
  it('returns empty string for invalid url', () => {
    expect(getPersonId('https://example.com/api/people/2')).toBe('')
  })

  it('returns last url part without trailing slash', () => {
    expect(getPersonId('https://swapi.dev/api/people/2/')).toBe('2')
  })

  it('returns last url part when trailing slash is absent', () => {
    expect(getPersonId('https://swapi.dev/api/people/2')).toBe('2')
  })
})