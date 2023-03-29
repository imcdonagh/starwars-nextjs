// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Person from '@/types/Person'
import type { NextApiRequest, NextApiResponse } from 'next'
import swapi from '../swapi'
import GetPersonDetailsResponse from '@/types/GetPersonDetailsResponse'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetPersonDetailsResponse | null>
) {
  if (req.method !== 'GET') {
    res.status(400).send(null)
    return
  }
  const id = req.query.id as string | null
  if (!id) {
    res.status(400).send(null)
    return
  }
  const response = await getPersonDetails(id)
  res.status(200).json(response)
}

export async function getPersonDetails(id: string): Promise<GetPersonDetailsResponse> {
  const resp = await swapi.get(`people/${id}`)
  const person = resp.data as Person
  const filmRequests = person.films.map(url => swapi.get(url))
  const starshipRequests = person.starships.map(url => swapi.get(url))
  const speciesRequests = person.species.map(url => swapi.get(url))
  const responses = await Promise.all([...speciesRequests, ...filmRequests, ...starshipRequests])
  const species = responses.slice(0, speciesRequests.length).map(resp => resp.data)
  const films = responses.slice(speciesRequests.length, speciesRequests.length + filmRequests.length).map(resp => resp.data)
  const starships = responses.slice(speciesRequests.length + filmRequests.length).map(resp => resp.data)
  const response: GetPersonDetailsResponse = {
    id, species, films, starships
  }
  return response
}
