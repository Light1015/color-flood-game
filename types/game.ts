export type Color = 'red' | 'green' | 'blue' | 'yellow';

export type Cell = {
  color: Color;
};

export type GameState = {
  board: Cell[][];
  movesLeft: number;
  selectedColor: Color | null;
  allowedColors: Color[];
  targetColor: Color;
  gameOver: boolean;
  gameWon: boolean;
};
