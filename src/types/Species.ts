export default interface Species {
  name: string
  [x: string | number | symbol]: unknown;
}