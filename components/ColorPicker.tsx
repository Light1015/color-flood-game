import { Color } from "../types/game";

export default function ColorPicker({
  colors,
  selected,
  onSelect,
}: {
  colors: Color[];
  selected: Color | null;
  onSelect: (color: Color) => void;
}) {
  return (
    <div className="flex gap-2 my-4">
      {colors.map((color) => (
        <button
          key={color}
          className={`w-8 h-8 rounded-full border-2 ${
            selected === color ? "border-black" : "border-white"
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onSelect(color)}
        />
      ))}
    </div>
  );
}
