export default function GameOverModal({
  won,
  onReset,
}: {
  won: boolean;
  onReset: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-2">
          {won ? "🎉 Bạn đã thắng!" : "💥 Thua rồi!"}
        </h2>
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
