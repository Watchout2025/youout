"use client";

import { CATEGORIES } from "@/lib/data";
import { useState } from "react";

export default function CategoryChips() {
  const [selected, setSelected] = useState("All");

  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar py-3 px-4 bg-background sticky top-14 z-30 transition-colors duration-300">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all border border-border-custom ${
            selected === category
              ? "bg-foreground text-background border-foreground"
              : "bg-sidebar-hover text-foreground hover:bg-sidebar-hover/80"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

