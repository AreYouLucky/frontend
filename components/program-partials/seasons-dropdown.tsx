import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ProgramSeasonModel } from "@/types/models";


type Props = {
  seasons: ProgramSeasonModel[];
  value: number | null;
  onChange: (id: number) => void;
  placeholder?: string;
};

export default function SeasonDropdown({
  seasons,
  value,
  onChange,
  placeholder = "Select Season",
}: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = seasons.find((s) => s.id === value);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="group flex w-full items-center justify-between overflow-hidden rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition duration-300 hover:bg-white/10 focus:border-[#00aeef]/70"
      >
        <span className="truncate">
          {selected?.title || placeholder}
        </span>

        <ChevronDown
          className={`h-4 w-4 text-white/70 transition duration-300 ${
            open ? "rotate-180 text-[#00aeef]" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl bg-zinc-900 shadow-sm backdrop-blur-xl border-white/60 shadow-[#00aeef]">
          <div className="max-h-60 overflow-y-auto px-2 py-2">
            {seasons.map((season) => {
              const isActive = season.id === value;

              return (
                <button
                  key={season.id}
                  onClick={() => {
                    onChange(season.id as number);
                    setOpen(false);
                  }}
                  className={`w-full px-5 py-3 text-left text-sm transition-all duration-200  border-b border-white/10 ${
                    isActive
                      ? " text-[#00aeef]"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {season.title}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}