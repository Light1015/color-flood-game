// ColorPicker là component hiển thị danh sách các nút chọn màu
// Props:
// - colors: danh sách các màu được phép chọn
// - selected: màu đang được chọn
// - onSelect: hàm callback khi chọn một màu mới

import { Color } from "../types/game";
import { BiSolidLeftArrow } from "react-icons/bi";

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
    // Hiển thị các màu theo cột, có khoảng cách giữa các hàng
    <div className="flex flex-col gap-4">
      {colors.map((color) => (
        // Mỗi dòng gồm nút màu và icon mũi tên (nếu đang được chọn)
        <div
          key={color}
          className="flex items-center justify-between gap-2 w-full"
        >
          {/* Nút chọn màu, hình tròn lớn */}
          <button
            className={`
              w-16 h-16 rounded-full border-2 
              transition-all duration-150 
              ${selected === color ? "ring-1 ring-black" : "ring-0"} // thêm viền đen khi được chọn
            `}
            style={{ backgroundColor: color }} // tô màu theo mã hex
            onClick={() => onSelect(color)} // chọn màu khi click
          />

          {/* Ô hiển thị icon mũi tên nếu được chọn, nếu không vẫn giữ kích thước để tránh layout bị đẩy */}
          <div className="w-6 h-6 flex items-center justify-center">
            {selected === color ? (
              <BiSolidLeftArrow className="text-2xl text-black" /> // hiển thị mũi tên khi đang chọn
            ) : (
              <div className="invisible">
                <BiSolidLeftArrow className="text-2xl" />
              </div> // giữ chỗ icon bằng cách invisible để tránh bị đẩy layout
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
