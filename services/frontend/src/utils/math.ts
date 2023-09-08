export function random(min: number, max: number, seed: number) {
  return Math.floor(min + (max - min) * seed);
}