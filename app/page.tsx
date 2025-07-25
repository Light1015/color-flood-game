"use client";

import GameBoard from "../components/GameBoard";
import ColorPicker from "../components/ColorPicker";
import { useGameReducer } from "../hooks/useGameReducer";

export default function HomePage() {
  const [state, dispatch] = useGameReducer();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-2">🎨 Color Fill Game</h1>

      <p className="mb-2">
        🎯 Mục tiêu: tô toàn bộ bảng thành{" "}
        <span className="font-bold" style={{ color: state.targetColor }}>
          {state.targetColor.toUpperCase()}
        </span>
      </p>

      <GameBoard board={state.board} onPaint={(x, y) => dispatch({ type: "PAINT_CELL", x, y })} />

      <ColorPicker
        colors={state.allowedColors}
        selected={state.selectedColor}
        onSelect={(color) => dispatch({ type: "SELECT_COLOR", color })}
      />

      <p className="text-lg">🖌️ Lượt còn lại: {state.movesLeft}</p>

      {state.gameOver && (
        <div className="mt-4 text-center">
          <p className={`text-xl ${state.gameWon ? "text-green-600" : "text-red-600"}`}>
            {state.gameWon ? "🎉 Bạn đã hoàn thành!" : "💥 Hết lượt, bạn thua rồi!"}
          </p>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => dispatch({ type: "RESET" })}
          >
            Chơi lại
          </button>
        </div>
      )}
    </main>
  );
}
