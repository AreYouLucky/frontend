
const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
import { useQuery } from "@tanstack/react-query";
import { PostModel,ProgramsModel } from "@/types/models";
import { TopCount } from "@/types/models";
import { useInfiniteQuery } from "@tanstack/react-query";

type SearchPostsResponse = {
  current_page: number;
  last_page: number;
  data: PostModel[];
  total: number;
};

export const loadHomePageMounts = async () => {
  try {
    const res = await fetch(`${baseURL}/api/load-home-page-mounts`, {
      headers: {
        "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN ?? "",
        "content-type": "application/json",
      },
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      console.error("Home Mount API failed:", res.status);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Home Mount fetch error:", error);
    return [];
  }
};

export function useGetFeaturedPrograms() {
  return useQuery<ProgramsModel[]>({
    queryKey: ["featured programs"],

    queryFn: async (): Promise<ProgramsModel[]> => {
      const res = await fetch(
        `${baseURL}/api/get-featured-programs`,
        {
          headers: {
            Accept: "application/json",
            "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN!,
            "content-type": "application/json",
          },
          next: { revalidate: 1800 },
        }
      );
      if (!res.ok) {
        console.error("Get post failed:", res.status);
        return [];
      }
      return (await res.json()) as ProgramsModel[];
    },

    staleTime: 1000 * 30,
  });
}

export function useGetFeaturedProgramsPosts() {
  return useQuery<ProgramsModel[]>({
    queryKey: ["featured programs-posts"],

    queryFn: async (): Promise<ProgramsModel[]> => {
      const res = await fetch(
        `${baseURL}/api/get-featured-programs-posts`,
        {
          headers: {
            Accept: "application/json",
            "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN!,
            "content-type": "application/json",
          },
          next: { revalidate: 1800 },
        }
      );
      if (!res.ok) {
        console.error("Get post failed:", res.status);
        return [];
      }
      return (await res.json()) as ProgramsModel[];
    },

    staleTime: 1000 * 30,
  });
}

export function useGetYtList() {
  return useQuery<TopCount>({
    queryKey: ["yt-list"],

    queryFn: async (): Promise<TopCount> => {
      const res = await fetch(
        `${baseURL}/api/youtube/top-videos/2026`,
        {
          headers: {
            Accept: "application/json",
            "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN!,
            "content-type": "application/json",
          },
          next: { revalidate: 1800 },
        }
      );
      if (!res.ok) {
        console.error("Get post failed:", res.status);
        return {} as TopCount;
      }
      return (await res.json()) as TopCount;
    },

    staleTime: 1000 * 30,
  });
}


export function useGetSearchedPosts(searchText: string) {
  const normalizedSearchText = searchText.trim();

  return useInfiniteQuery<SearchPostsResponse>({
    queryKey: ["searched-posts", normalizedSearchText],

    queryFn: async ({ pageParam = 1 }): Promise<SearchPostsResponse> => {
      const res = await fetch(
        `${baseURL}/api/search?search=${encodeURIComponent(
          normalizedSearchText
        )}&page=${pageParam}`,
        {
          headers: {
            Accept: "application/json",
            "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN!,
            "Content-Type": "application/json",
          },
        }
      );

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

    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },

    enabled: normalizedSearchText.length > 0,
  });
}

