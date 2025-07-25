import { Cell, Color } from '../types/game';

/**
 * Flood-fill từ ô (x, y): nếu màu giống fromColor thì lan ra các ô lân cận cùng màu.
 */
export function floodFill(
  board: Cell[][],
  fromColor: Color,
  toColor: Color,
  x: number,
  y: number
): Cell[][] {
  if (fromColor === toColor) return board;

  const size = board.length;
  const queue = [[x, y]];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const [i, j] = queue.pop()!;
    const key = `${i},${j}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const cell = board[i][j];

    // Nếu không đúng màu cũ thì bỏ qua
    if (cell.color !== fromColor) continue;

    // Tô lại màu mới
    cell.color = toColor;

    // Thêm 4 ô lân cận vào queue
    const directions = [
      [i - 1, j],
      [i + 1, j],
      [i, j - 1],
      [i, j + 1]
    ];

    for (const [ni, nj] of directions) {
      if (ni >= 0 && ni < size && nj >= 0 && nj < size) {
        queue.push([ni, nj]);
      }
    }
  }

  return board;
}
