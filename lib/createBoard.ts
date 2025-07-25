import { Cell, Color } from "../types/game";

export function getRandomColors(all: Color[], count: number): Color[] {
  const shuffled = [...all].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const createBoard = (size: number, allowedColors: Color[]): Cell[][] => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      color: allowedColors[Math.floor(Math.random() * allowedColors.length)],
    }))
  );
};
