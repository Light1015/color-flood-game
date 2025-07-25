// Component MoveCounter nhận vào props là số lượt còn lại và hiển thị nó
export default function MoveCounter({ moves }: { moves: number }) {
  return <p className="text-lg font-semibold">Lượt còn lại: {moves}</p>;
}
