"use client";

import { useEffect } from "react";

// Kiểu cho props, chỉ cần một hàm xử lý khi bấm nút
interface ResetButtonProps {
  onClick: () => void;
}

export default function ResetButton({ onClick }: ResetButtonProps) {
  // Dùng useEffect để thêm sự kiện lắng nghe phím "R"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Nếu người dùng nhấn phím "r" (không phân biệt hoa/thường)
      if (e.key.toLowerCase() === "r") {
        e.preventDefault(); // Ngăn trang reload mặc định khi nhấn R
        onClick(); // Gọi hàm reset game
      }
    };

    // Thêm event listener khi component mount
    document.addEventListener("keydown", handleKeyDown);
    // Xóa listener khi component unmount
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClick]);

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Nút restart hình tròn, chứa chữ 'R' */}
      <button
        onClick={onClick}
        className="w-[64px] h-[64px] rounded-full border-4 border-gray-600 text-2xl font-bold flex items-center justify-center hover:scale-105 transition-all"
        aria-label="Restart Game"
      >
        R
      </button>

      {/* Gợi ý bàn phím: hiển thị phím R + chữ Restart */}
      <div className="flex items-center space-x-2 text-sm text-gray-700">
        <div className="px-2 py-1 border rounded bg-gray-100 font-mono leading-none">R</div>
        <span>Restart</span>
      </div>
    </div>
  );
}
