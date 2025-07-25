import { Cell } from "../types/game";

export default function GameBoard({
  board,
  onPaint,
}: {
  board: Cell[][];
  onPaint: (x: number, y: number) => void;
}) {
  return (
    <div className="grid grid-cols-10 gap-1">
      {board.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            onClick={() => onPaint(i, j)}
            className="w-[66px] h-[66px] cursor-none border border-gray-300 rounded-md transition-all duration-100"
            style={{ backgroundColor: cell.color }}
          />
        ))
      )}
    </div>
  );
}
