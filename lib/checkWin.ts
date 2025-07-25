import { Cell, Color } from "../types/game";

/**
 * Hàm kiểm tra toàn bộ bảng đã được tô thành 1 màu duy nhất (target) hay chưa.
 * Trả về true nếu tất cả các ô đều có màu target, ngược lại trả về false.
 */
export function allCellsSameColor(board: Cell[][], target: Color): boolean {
  // Dùng .flat() để biến mảng 2 chiều thành 1 mảng 1 chiều gồm tất cả các ô
  // Dùng .every() để kiểm tra tất cả các ô có color === target hay không
  return board.flat().every((cell) => cell.color === target);
}
