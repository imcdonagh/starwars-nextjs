import axios from 'axios'
import GetPeopleResponse from '@/types/GetPeopleResponse'
import PersonDetails from '@/types/GetPersonDetailsResponse'

const api = axios.create({ baseURL: '/api' })

export async function getPeople(search: string, page?: number): Promise<GetPeopleResponse | null> {
  try {
    const qp = new URLSearchParams()
    qp.set('search', search)
    if (page) qp.set('page', String(page))
    let query = qp.toString()
    if (query) query = '?' + query
    const resp = await api.get('/people'+query)
    return resp.data
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function getPersonDetails(id: string): Promise<PersonDetails | null> {
  try {
    const resp = await api.get(`/people/${id}`)
    return resp.data
  } catch (e) {
    console.error(e)
    return null
  }
}