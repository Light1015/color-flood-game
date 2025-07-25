import { Cell } from "../types/game";

export default function GameBoard({
  board,
  onPaint,
}: {
  board: Cell[][];
  onPaint: (x: number, y: number) => void;
}) {
  return (
    <div className="grid grid-cols-8 gap-0.5">
      {board.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            onClick={() => onPaint(i, j)}
            className="w-8 h-8 cursor-pointer border border-gray-300"
            style={{ backgroundColor: cell.color }}
          />
        ))
      )}
    </div>
  );
}
