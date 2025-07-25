import { useReducer } from "react";
import { createBoard, getRandomColors } from "../lib/createBoard";
import { allCellsSameColor } from "../lib/checkWin";
import { Color, GameState } from "../types/game";
import { floodFill } from "../lib/floodFill";

// Định nghĩa các hành động có thể xảy ra trong game
type Action =
  | { type: "SELECT_COLOR"; color: Color }          // Chọn màu tô
  | { type: "PAINT_CELL"; x: number; y: number }    // Tô một ô trên board
  | { type: "RESET" };                              // Reset game

// Kích thước bảng game: 8 hàng x 10 cột
const ROWS = 8;
const COLS = 10;

// Số lượt tối đa
const MAX_MOVES = 25;

// Danh sách mã màu hex tùy chỉnh (có thể mở rộng)
const ALL_COLORS: Color[] = ['#d8c470', '#c2322a', '#2b4a82', '#55af95'];

/**
 * Tạo trạng thái ban đầu của game:
 * - Chọn ngẫu nhiên 3 màu trong ALL_COLORS làm allowedColors
 * - Tạo board với các màu đó
 * - Chọn 1 trong 3 màu làm targetColor (màu đích)
 */
const createInitialState = (): GameState => {
  const allowedColors = getRandomColors(ALL_COLORS, 3);
  const targetColor = allowedColors[Math.floor(Math.random() * allowedColors.length)];
  const board = createBoard(ROWS, COLS, allowedColors);

  return {
    board,
    allowedColors,
    targetColor,
    selectedColor: null,
    movesLeft: MAX_MOVES,
    gameOver: false,
    gameWon: false,
  };
};

/**
 * Reducer chính để xử lý trạng thái của game
 */
function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {

    // Khi người chơi chọn màu mới
    case "SELECT_COLOR":
      return { ...state, selectedColor: action.color };

    // Khi người chơi click để tô một ô
    case "PAINT_CELL": {
      // Nếu game đã kết thúc hoặc chưa chọn màu thì không làm gì
      if (state.gameOver || state.selectedColor === null) return state;

      // Clone board để không làm thay đổi trực tiếp state cũ
      const boardCopy = structuredClone(state.board);

      // Lấy màu của ô được click để bắt đầu flood
      const fromColor = boardCopy[action.x][action.y].color;

      // Thực hiện flood fill từ ô được chọn
      const newBoard = floodFill(boardCopy, fromColor, state.selectedColor, action.x, action.y);

      // Kiểm tra xem người chơi đã chiến thắng chưa
      const won = allCellsSameColor(newBoard, state.targetColor);

      return {
        ...state,
        board: newBoard,
        movesLeft: state.movesLeft - 1,
        gameWon: won,
        gameOver: won || state.movesLeft - 1 <= 0, // Kết thúc nếu thắng hoặc hết lượt
      };
    }

    // Khi nhấn nút "Chơi lại"
    case "RESET":
      return createInitialState();

    // Trường hợp không khớp action nào
    default:
      return state;
  }
}

// Hook custom để dùng reducer
export const useGameReducer = () => useReducer(reducer, createInitialState());
