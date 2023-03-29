import Film from "./Film";
import Species from "./Species";
import Starship from "./Starship";

export default interface GetPersonDetailsResponse {
  id: string
  species: Species[]
  films: Film[]
  starships: Starship[]
}