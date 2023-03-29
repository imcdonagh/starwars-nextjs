export default interface Starship {
  name: string
  [x: string | number | symbol]: unknown;
}