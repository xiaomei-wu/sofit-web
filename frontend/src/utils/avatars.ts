import { random } from './math';

const colors = [
  '#FEA96B',
  '#FF9B9D',
  '#89C015',
  '#6A6A6B',
  '#ADE9F7',
  '#0A99FF',
  '#FFF0C2'
];

export function randomColor(seed: number) {
  return colors[random(0, colors.length, seed)];
}
