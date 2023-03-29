import Person from './Person'

export default interface GetPeopleResponse {
  count: number
  next: string | null
  previous: string | null
  results: Person[]
}