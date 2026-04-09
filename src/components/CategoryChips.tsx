"use client";

import { CATEGORIES } from "@/lib/data";
import { useState } from "react";

export default function CategoryChips() {
  const [selected, setSelected] = useState("All");

  return (
    <div className="sticky top-14 bg-[#0f0f0f] z-30 py-3 overflow-x-auto no-scrollbar flex items-center gap-3">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            selected === category
              ? "bg-white text-black"
              : "bg-[#272727] text-white hover:bg-[#3f3f3f]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
