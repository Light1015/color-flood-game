// Kiểu Color đại diện cho một chuỗi mã màu (có thể là '#hex', 'rgb()', hoặc tên màu như 'red')
// Ví dụ: '#ff0000', 'blue', 'rgb(255,0,0)'
export type Color = string;

// Mỗi ô trên bảng sẽ có 1 màu => đại diện bằng 1 đối tượng Cell có thuộc tính color
export type Cell = {
  color: Color;
};

// Trạng thái tổng thể của game
export type GameState = {
  board: Cell[][];           // Ma trận 2 chiều đại diện cho bảng chơi, mỗi ô là 1 Cell
  movesLeft: number;         // Số lượt còn lại của người chơi
  selectedColor: Color | null; // Màu hiện tại người chơi đang chọn để tô, null nếu chưa chọn
  allowedColors: Color[];    // Danh sách các màu được phép sử dụng trong ván chơi này
  targetColor: Color;        // Màu mà người chơi phải tô hết bảng để thắng
  gameOver: boolean;         // Trạng thái kết thúc game (true nếu thắng/thua)
  gameWon: boolean;          // true nếu người chơi thắng, false nếu thua
};
