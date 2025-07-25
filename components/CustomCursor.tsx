'use client';

import { useEffect, useRef } from 'react';
import { GrSelect } from 'react-icons/gr';

export default function CustomCursor({
  color = '#000',
}: {
  color?: string;
}) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Cập nhật vị trí ngay lập tức, không dùng transition
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    window.addEventListener('mousemove', moveHandler);
    return () => window.removeEventListener('mousemove', moveHandler);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        transform: 'translate(0, 0)',
        transition: 'none', // bỏ delay
      }}
    >
      <GrSelect
        size={24}
        style={{
          color: color,
          transform: 'translate(-50%, -50%)', // căn giữa icon với chuột
        }}
      />
    </div>
  );
}
