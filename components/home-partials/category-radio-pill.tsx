"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CategoriesModel } from "@/types/models";

interface Props {
  categories: CategoriesModel[];
  onChange?: (selectedIds: number[]) => void;
  className?: string;
}

export default function CategoryRadioPills({
  categories,
  onChange,
  className = "",
}: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  function toggleCategory(id: number) {
    const updated = selected.includes(id)
      ? selected.filter((x) => x !== id)
      : [...selected, id];

    setSelected(updated);
    onChange?.(updated);
  }

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateState = () => {
      const overflow = el.scrollWidth > el.clientWidth + 1;
      setIsOverflowing(overflow);

      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(
        el.scrollLeft + el.clientWidth < el.scrollWidth - 1
      );
    };

    updateState();

    const resizeObserver = new ResizeObserver(updateState);
    resizeObserver.observe(el);

    el.addEventListener("scroll", updateState);

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener("scroll", updateState);
    };
  }, [categories]);

  function scrollLeft() {
    containerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  }

  function scrollRight() {
    containerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  }


  return (
    <div className={`relative w-full z-30 py-4  bg-zinc-900 ${className}`}>
      {/* LEFT ARROW */}
      {isOverflowing && (
        <button
          onClick={scrollLeft}
          className={`
            absolute left-0 top-1/2 -translate-y-1/2 z-20
            transition-opacity duration-300
            ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* CENTER WRAPPER */}
      <div className="flex justify-center w-full ">
        {/* SCROLL CONTAINER */}
        <div
          ref={containerRef}
          className={`
            flex md:gap-3 lg:gap-5
            overflow-x-auto scroll-smooth no-scrollbar
            ${isOverflowing ? "w-full px-10 justify-start" : "w-fit justify-center"}
          `}
        >
          {categories.map((cat) => {
            const active = selected.includes(cat.category_id as number);

            return (
              <div
                key={cat.category_id}
                onClick={() => toggleCategory(cat.category_id as number)}
                className={`
                  cursor-pointer select-none whitespace-nowrap
                  lg:px-4 lg:py-2 rounded-xl py-1 px-3 
                  lg:text-[15px] md:text-[12px] text-[10.5px] font-semibold
                  transition-all duration-200 hover:scale-105 tracking-wide
                  ${
                    active
                      ? "bg-[#ffffff]/80 text-black"
                      : "text-white/90 hover:bg-neutral-800"
                  }
                `}
              >
                {cat.title}
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT ARROW */}
      {isOverflowing && (
        <button
          onClick={scrollRight}
          className={`
            absolute right-0 top-1/2 -translate-y-1/2 z-20
            transition-opacity duration-300
            ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <ChevronRight size={22} />
        </button>
      )}
    </div>
  );
}
