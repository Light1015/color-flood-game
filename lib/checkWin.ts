import { Cell, Color } from "../types/game";

export function allCellsSameColor(board: Cell[][], target: Color): boolean {
  return board.flat().every((cell) => cell.color === target);
}
