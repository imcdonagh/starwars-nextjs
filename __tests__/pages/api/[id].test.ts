import swapi from '../../../src/pages/api/swapi'
import MockAdapter from 'axios-mock-adapter'
import { getPersonDetails } from '@/pages/api/people/[id]'

const mock = new MockAdapter(swapi)

const SWAPI_URL = 'https://swapi.dev/api'

const allPeople = [
  { 
    name: 'Anne Jackson',
    species: [
      `${SWAPI_URL}/species/1`
    ],
    films: [],
    starships: []
  },
  {
    name: 'Bob Jones', 
    species: [], 
    films: [`${SWAPI_URL}/films/1`],
    starships: []
  },
  { 
    name: 'Fred Jones', 
    species: [], 
    films: [], 
    starships: [`${SWAPI_URL}/starships/1`]
  },
  {
    name: 'George Thomas',
    species: [`${SWAPI_URL}/species/1`],
    films: [`${SWAPI_URL}/films/1`],
    starships: [`${SWAPI_URL}/starships/1`]
  }
]

const allSpecies = [
  { name: 'species1' }
]

const allFilms = [
  { title: 'film1' }
]

const allStarships = [
  { name: 'starship1' }
]

for (let i = 0; i < allPeople.length; i++) {
  mock.onGet(`people/${i+1}`).reply(() => {
    return [200, allPeople[i]]
  })  
}

mock.onGet('https://swapi.dev/api/starships/1').reply(() => {
  return [200, allStarships[0]]
})

mock.onGet('https://swapi.dev/api/films/1').reply(() => {
  return [200, allFilms[0]]
})

mock.onGet('https://swapi.dev/api/species/1').reply(() => {
  return [200, allSpecies[0]]
})

it('returns species when specified', async() => {
  const data = await getPersonDetails('1')
  expect(data.id).toBe('1')
  expect(data.species).toEqual([allSpecies[0]])
  expect(data.films).toEqual([])
  expect(data.starships).toEqual([])
})

it('returns films when specified', async () => {
  const data = await getPersonDetails('2')
  expect(data.id).toBe('2')
  expect(data.species).toEqual([])
  expect(data.films).toEqual([allFilms[0]])
  expect(data.starships).toEqual([])
})

it('returns starships when specified', async() => {
  const data = await getPersonDetails('3')
  expect(data.id).toBe('3')
  expect(data.species).toEqual([])
  expect(data.films).toEqual([])
  expect(data.starships).toEqual([allStarships[0]])
})

it('returns all arrays when specified', async () => {
  const data = await getPersonDetails('4')
  expect(data.id).toBe('4')
  expect(data.species).toEqual([allSpecies[0]])
  expect(data.films).toEqual([allFilms[0]])
  expect(data.starships).toEqual([allStarships[0]])
})
