import { ProgramsModel, PostModel, AgencyModel, CategoriesModel, RegionModel } from "@/types/models";
import { useInfiniteQuery } from "@tanstack/react-query";
const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export type AdvanceSearchFilters = {
  search: string;
  year: string;
  program: string;
  categories: string[];
  agencies: string[];
  regions: string[];
};

export type AdvanceSearchResponse = {
  current_page: number;
  last_page: number;
  data: PostModel[];
  total: number;
};

export type AdvanceSearchFilterOptions = {
  programs: ProgramsModel[];
  categories: CategoriesModel[];
  agencies: AgencyModel[];
  regions: RegionModel[];
};

export const loadSearchFilters = async () => {
  try {
    const res = await fetch(`${baseURL}/api/load-search-mounts`, {
      headers: {
        Accept: "application/json",
        "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN ?? "",
        "content-type": "application/json",
      },
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      console.error("Search Mount API failed:", res.status);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Search Mount fetch error:", error);
    return [];
  }
};

function normalizeAdvanceSearchFilters(filters: AdvanceSearchFilters): AdvanceSearchFilters {
  return {
    search: filters.search.trim(),
    year: filters.year,
    program: filters.program,
    categories: [...filters.categories].sort(),
    agencies: [...filters.agencies].sort(),
    regions: [...filters.regions].sort(),
  };
}
export function useGetAdvanceSearchedPosts(filters: AdvanceSearchFilters) {
  const normalizedFilters = normalizeAdvanceSearchFilters(filters);

  const hasActiveFilters =
    Boolean(normalizedFilters.search) ||
    Boolean(normalizedFilters.year) ||
    Boolean(normalizedFilters.program) ||
    normalizedFilters.categories.length > 0 ||
    normalizedFilters.agencies.length > 0 ||
    normalizedFilters.regions.length > 0;

  return useInfiniteQuery<AdvanceSearchResponse>({
    queryKey: ["searched-posts", normalizedFilters],

    queryFn: async ({ pageParam = 1 }): Promise<AdvanceSearchResponse> => {
      const params = new URLSearchParams();

      Object.entries(normalizedFilters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            params.append(`${key}[]`, String(v));
          });
        } else if (value) {
          params.append(key, String(value));
        }
      });

      params.append("page", String(pageParam));

      const res = await fetch(`${baseURL}/api/advance-search?${params.toString()}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN!,
          "content-type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Search posts failed:", res.status);

        return {
          current_page: Number(pageParam),
          last_page: Number(pageParam),
          data: [],
          total: 0,
        };
      }

      return res.json();
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage: AdvanceSearchResponse): number | undefined => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },

    enabled: hasActiveFilters,
  });
}