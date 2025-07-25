import { Cell, Color } from "../types/game";

/**
 * Trả về một mảng ngẫu nhiên gồm `count` màu từ danh sách tất cả các màu.
 * @param all - Tập hợp tất cả các màu có thể dùng
 * @param count - Số lượng màu cần chọn ngẫu nhiên
 */
export function getRandomColors(all: Color[], count: number): Color[] {
  // Sao chép mảng gốc và xáo trộn bằng sort với Math.random
  const shuffled = [...all].sort(() => 0.5 - Math.random());

  // Trích ra `count` phần tử đầu tiên sau khi xáo trộn
  return shuffled.slice(0, count);
}

/**
 * Tạo một ma trận `rows x cols` chứa các ô với màu ngẫu nhiên từ `allowedColors`
 * @param rows - Số hàng của bảng
 * @param cols - Số cột của bảng
 * @param allowedColors - Danh sách màu được phép dùng để tạo board
 * @returns Ma trận Cell chứa màu ngẫu nhiên
 */
export const createBoard = (
  rows: number,
  cols: number,
  allowedColors: Color[]
): Cell[][] => {
  return Array.from({ length: rows }, () => // Lặp qua từng hàng
    Array.from({ length: cols }, () => ({   // Lặp qua từng cột trong mỗi hàng
      // Gán cho mỗi ô một màu ngẫu nhiên từ danh sách allowedColors
      color: allowedColors[Math.floor(Math.random() * allowedColors.length)],
    }))
  );
};
