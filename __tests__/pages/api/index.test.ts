import swapi from '../../../src/pages/api/swapi'
import MockAdapter from 'axios-mock-adapter'
import { getPeople } from '../../../src/pages/api/people'
import GetPeopleResponse from '@/types/GetPeopleResponse'

const mock = new MockAdapter(swapi)

const allPeople = [
  { name: 'Anne Jackson' },
  { name: 'Bob Jones' },
  { name: 'Fred Jones' }
]

mock.onGet('people?search=jones').reply(() => {
  return [200, {
  count: 2,
  results: allPeople.filter(person => person.name.toLowerCase().indexOf('jones') !== -1)
  }]
})

mock.onGet('people').reply(() => {
  return [200, {
    count: allPeople.length,
    results: allPeople
  }]
})

it('returns all people for no search', async() => {
  const resp = await getPeople({ search: null, page: null })
  const data: GetPeopleResponse = resp.data
  expect(data.count).toBe(3)
  expect(data.results.length).toBe(3)
  expect(data.results[0].name).toBe('Anne Jackson')
  expect(data.results[2].name).toBe('Fred Jones')
})

it('returns people matching search', async () => {
  const resp = await getPeople({search: 'jones', page: ''})
  const data: GetPeopleResponse = resp.data
  expect(data.count).toBe(2)
  expect(data.results.length).toBe(2)
  expect(data.results[0].name).toBe('Bob Jones')
  expect(data.results[1].name).toBe('Fred Jones')
})


