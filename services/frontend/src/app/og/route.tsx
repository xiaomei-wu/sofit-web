import { randomColor } from '@/utils/avatars';
import { random } from '@/utils/math';
import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <svg height="100" viewBox="0 0 100 100" width="100">
        <rect fill={randomColor(Math.random())} height="100%" width="100%" />
        <circle
          cx={random(20, 40, Math.random())}
          cy={random(20, 40, Math.random() / 2)}
          fill="black"
          r={random(1, 9, Math.random())}
        />
        <circle
          cx={random(60, 80, Math.random())}
          cy={random(20, 40, Math.random())}
          fill="black"
          r={random(1, 9, Math.random())}
        />
        <path
          d={`M ${random(20, 40, Math.random())} ${random(
            40,
            60,
            Math.random(),
          )} Q ${random(30, 50, Math.random())} ${random(
            50,
            70,
            Math.random(),
          )} ${random(60, 80, Math.random())} ${random(40, 60, Math.random())}`}
          fill="none"
          stroke="black"
          stroke-width={random(1, 9, Math.random())}
        />
      </svg>
    ),
    {
      width: 100,
      height: 100,
    },
  );
}
