"use client";

import { CATEGORIES } from "@/lib/data";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoryChips() {
  const [selected, setSelected] = useState("All");
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftBtn(scrollLeft > 0);
      setShowRightBtn(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-background sticky top-14 z-30 transition-colors duration-300 px-4">
      {/* Left Button */}
      {showLeftBtn && (
        <div className="absolute left-0 top-0 bottom-0 flex items-center z-10 bg-gradient-to-r from-background via-background to-transparent pr-8">
          <button 
            onClick={() => scroll("left")}
            className="p-2 hover:bg-sidebar-hover rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
        </div>
      )}

      {/* Chips Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto no-scrollbar py-3 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelected(category)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all border border-border-custom flex-shrink-0 ${
              selected === category
                ? "bg-foreground text-background border-foreground"
                : "bg-sidebar-hover text-foreground hover:bg-sidebar-hover/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Right Button */}
      {showRightBtn && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center z-10 bg-gradient-to-l from-background via-background to-transparent pl-8">
          <button 
            onClick={() => scroll("right")}
            className="p-2 hover:bg-sidebar-hover rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        </div>
      )}
    </div>
  );
}

