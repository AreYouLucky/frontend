import { useQuery } from "@tanstack/react-query";
import { ProgramSeasonsPosts, ProgramPosts } from "@/types/models";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export const getProgramInfo = async (slug: string) => {
  try {
    const res = await fetch(
      `${baseURL}/api/get-program-info/${slug}`,
      {
        headers: {
          "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN ?? "",
          "content-type": "application/json",
        },
        next: { revalidate: 1800 },
      }
    );

    if (!res.ok) {
      console.error("Program info failed:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Program info fetch error:", error);
    return null;
  }
};

export function useGetProgramSeasonsPosts(code: string) {
  return useQuery<ProgramSeasonsPosts>({
    queryKey: ["program-seasons-posts", code],

    queryFn: async (): Promise<ProgramSeasonsPosts> => {
      const res = await fetch(
        `${baseURL}/api/get-program-seasons-posts/${code}`,
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
        return {} as ProgramSeasonsPosts;
      }
      return (await res.json()) as ProgramSeasonsPosts;
    },

    staleTime: 1000 * 30,
  });
}

import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetProgramPosts(code: string) {
  return useInfiniteQuery({
    queryKey: ["program-posts", code],

    queryFn: async ({ pageParam = 1 }): Promise<ProgramPosts> => {
      const res = await fetch(
        `${baseURL}/api/get-program-posts/${code}?page=${pageParam}`,
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
        return {} as ProgramPosts;
      }

      return res.json();
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const current = lastPage.posts.current_page;
      const last = lastPage.posts.last_page;

      return current < last ? current + 1 : undefined;
    },

    staleTime: 1000 * 30,
  });
}