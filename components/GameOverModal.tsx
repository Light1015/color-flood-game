// GameOverModal là một popup hiển thị khi trò chơi kết thúc (thắng hoặc thua)
// Props:
// - won: true nếu người chơi thắng, false nếu thua
// - onReset: hàm callback để reset trò chơi

export default function GameOverModal({
  won,
  onReset,
}: {
  won: boolean;
  onReset: () => void;
}) {
  return (
    // Lớp phủ toàn màn hình mờ mờ nền (black/50 = 50% opacity)
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Nội dung popup chính giữa */}
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        {/* Tiêu đề, thay đổi theo trạng thái thắng/thua */}
        <h2 className="text-2xl font-bold mb-2">
          {won ? "Bạn đã thắng!" : "Thua rồi!"}
        </h2>

        {/* Nút chơi lại */}
        <button
          onClick={onReset}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Chơi lại
        </button>
      </div>
    </div>
  );
}
