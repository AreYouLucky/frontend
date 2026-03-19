import { useEffect, useState, useRef } from "react";
import { SelectOption } from "@/types/models";
import {ChevronDown} from "lucide-react";
export default function FilterMultiSelect({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: SelectOption[];
  selected: string[];
  onChange: (nextValue: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedLabels = options
    .filter((option) => selected.includes(option.id))
    .map((option) => option.label);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-14 w-full items-center justify-between rounded-2xl border border-white/70  px-6 py-3 text-left text-white  transition hover:bg-white/10"
      >
        <div className="min-w-0">
          <p className="text-[8px] uppercase tracking-[0.3em] text-white/65">
            {label}
          </p>
          <p className="truncate text-[12.5px] tracking-wide text-white">
            {selectedLabels.length > 0
              ? selectedLabels.join(", ")
              : `Select ${label.toLowerCase()}`}
          </p>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-white/65 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.8rem)] z-50 overflow-hidden backdrop-blur-xl bg-zinc-900 rounded-2xl border border-white/40 p-2 shadow-lg shadow-white/40 py-4 scale-105">
          <div className="scroll-slim max-h-64 space-y-1 overflow-y-auto pr-2 pl-1">
            {options.length > 0 ? (
              options.map((option) => {
                const isSelected = selected.includes(option.id);

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      onChange(
                        isSelected
                          ? selected.filter((value) => value !== option.id)
                          : [...selected, option.id]
                      )
                    }
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                      isSelected
                        ? "bg-white/70 text-zinc-900 backdrop-blur-md"
                        : " text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <span className="truncate">{option.label}</span>
                    
                  </button>
                );
              })
            ) : (
              <div className="rounded-xl bg-white/5 px-3 py-4 text-sm text-white/55">
                No options available yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
