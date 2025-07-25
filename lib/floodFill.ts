import { Cell, Color } from '../types/game';

/**
 * Flood-fill từ ô (x, y): nếu màu giống fromColor thì lan ra các ô lân cận cùng màu.
 * Dùng thuật toán duyệt theo chiều rộng (BFS) với queue.
 */
export function floodFill(
  board: Cell[][],       // Ma trận board (mỗi ô có màu)
  fromColor: Color,      // Màu ban đầu cần thay thế
  toColor: Color,        // Màu mới để tô
  x: number,             // Tọa độ dòng bắt đầu
  y: number              // Tọa độ cột bắt đầu
): Cell[][] {
  // Nếu màu mới giống màu cũ thì không cần làm gì
  if (fromColor === toColor) return board;

  const rows = board.length;         // Số hàng
  const cols = board[0].length;      // Số cột
  const queue: [number, number][] = [[x, y]]; // Khởi tạo queue BFS từ ô (x, y)
  const visited = new Set<string>(); // Set để đánh dấu các ô đã duyệt

  while (queue.length > 0) {
    const [i, j] = queue.pop()!;     // Lấy một ô ra khỏi queue
    const key = `${i},${j}`;         // Tạo key duy nhất cho ô đó

    if (visited.has(key)) continue;  // Nếu đã duyệt rồi thì bỏ qua
    visited.add(key);                // Đánh dấu đã duyệt

    const cell = board[i][j];        // Lấy ô hiện tại

    // Nếu màu của ô này không khớp fromColor thì không tô
    if (cell.color !== fromColor) continue;

    // Tô màu mới
    cell.color = toColor;

    // Tạo danh sách các ô kề 4 hướng (trên, dưới, trái, phải)
    const directions = [
      [i - 1, j], // lên
      [i + 1, j], // xuống
      [i, j - 1], // trái
      [i, j + 1]  // phải
    ];

    // Với mỗi ô kề, nếu nằm trong board thì đưa vào queue để xử lý tiếp
    for (const [ni, nj] of directions) {
      if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
        queue.push([ni, nj]);
      }
    }
  }

  return board; // Trả về board đã được tô
}
