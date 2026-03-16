import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SelectOption } from "@/types/models";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function trimText(text: string, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}
export function stripHtml(html: string) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function convertShortDate(date: Date | string | number): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function convertLongDate(date: Date | string | number): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}


export function normalizeOptions<T>(
  items: T[],
  getId: (item: T) => string | number | null | undefined,
  getLabel: (item: T) => string | null | undefined
): SelectOption[] {
  const seen = new Set<string>();

  return items.reduce<SelectOption[]>((acc, item) => {
    const rawId = getId(item);
    const rawLabel = getLabel(item);

    if (!rawId || !rawLabel) return acc;

    const id = String(rawId); // ⭐ important
    const label = rawLabel;

    if (!seen.has(id)) {
      seen.add(id);
      acc.push({ id, label });
    }

    return acc;
  }, []);
}

export function generateYearOptions(
  startYear = 1980,
  endYear = new Date().getFullYear()
): SelectOption[] {
  const years: SelectOption[] = [];

  for (let year = endYear; year >= startYear; year--) {
    years.push({
      id: year.toString(),
      label: year.toString(),
    });
  }

  return years;
}