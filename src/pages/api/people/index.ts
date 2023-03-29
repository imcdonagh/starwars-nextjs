// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import swapi from '../swapi'
import GetPeopleResponse from '@/types/GetPeopleResponse'
import { AxiosResponse } from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetPeopleResponse | null>
) {
  if (req.method !== 'GET') {
    res.status(400).send(null)
    return
  }
  const search = req.query.search as string || null
  const page = req.query.page as string || null
  const resp = await getPeople({
    search,
    page
  })
  res.status(200).json(resp.data)
}

export interface GetPeopleParams {
  search: string | null | undefined
  page: string | null | undefined
}

export async function getPeople(params: GetPeopleParams): Promise<AxiosResponse> {
  let qp = new URLSearchParams()
  if (params.search) {
    const search = params.search as string
    qp.set('search', search)
  }
  if (params.page) {
    const page = params.page as string
    qp.set('page', page)
  }
  let query = qp.toString()
  if (query) query = '?' + query
  const resp = await swapi.get('people'+query)
  return resp
}
