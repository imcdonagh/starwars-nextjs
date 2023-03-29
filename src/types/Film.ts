export default interface Film {
  title: string
  [x: string | number | symbol]: unknown;
}