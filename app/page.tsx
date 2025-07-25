"use client";

import "./globals.css";
import { useGameReducer } from "../hooks/useGameReducer";
import GameBoard from "../components/GameBoard";
import ColorPicker from "../components/ColorPicker";
import CustomCursor from "../components/CustomCursor";
import ResetButton from "../components/ResetButton";
import { COLOR_NAMES } from "../lib/colorNames";

export default function HomePage() {
  const [state, dispatch] = useGameReducer();

  return (
    <main className="relative min-h-screen flex flex-col bg-gray-100 p-2 cursor-none">
      {/* Custom cursor */}
      <CustomCursor color={state.selectedColor ?? undefined} variant="default" />

      {/* Header top-left */}
      <div className="flex flex-col justify-start items-start w-full max-w-6xl mx-10 mb-0">
        <div>
          <h1 className="text-2xl font-bold">Color Fill Game</h1>
          <p className="text-lg">Lượt còn lại: {state.movesLeft}</p>
        </div>
      </div>

      {/* Game layout */}
      <div className="flex flex-row justify-center gap-8 items-start w-full max-w-6xl mx-auto">
        {/* Game Board */}
        <div className="border-4 border-gray-500 rounded-lg w-[740px] h-[600px] flex items-center justify-center">
          <GameBoard
            board={state.board}
            onPaint={(x, y) => dispatch({ type: "PAINT_CELL", x, y })}
          />
        </div>

        {/* Sidebar: ColorPicker + ResetButton */}
        <div className="flex flex-col items-center justify-start gap-6">
          {/* ColorPicker container */}
          <div className="flex flex-col items-center ml-7">
            <ColorPicker
              colors={state.allowedColors}
              selected={state.selectedColor}
              onSelect={(color) => dispatch({ type: "SELECT_COLOR", color })}
            />
          </div>

          {/* ResetButton container */}
          <div className="flex justify-center">
            <ResetButton onClick={() => dispatch({ type: "RESET" })} />
          </div>
        </div>

      </div>

      {/* Mục tiêu hiển thị bên dưới board */}
      <div className="mt-6 text-center">
        <p className="text-lg">
          Mục tiêu: tô toàn bộ bảng thành{" "}
          <span className="font-bold" style={{ color: state.targetColor }}>
            {COLOR_NAMES[state.targetColor] ?? state.targetColor}
          </span>
        </p>
      </div>

      {/* Game Over Popup */}
      {state.gameOver && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div className="absolute inset-0 bg-opacity-30 backdrop-blur-xs" />

          {/* Nội dung popup */}
          <div className="relative bg-white rounded-lg p-6 shadow-xl z-10 text-center max-w-sm w-full">
            <h2 className={`text-2xl font-bold mb-4 ${state.gameWon ? "text-green-600" : "text-red-600"}`}>
              {state.gameWon ? "Bạn đã hoàn thành!" : "Hết lượt, bạn thua rồi!"}
            </h2>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => dispatch({ type: "RESET" })}
            >
              Chơi lại
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
