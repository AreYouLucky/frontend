
const baseURL =
    typeof window === "undefined"
        ? process.env.BACKEND_INTERNAL_URL
        : process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const loadHomePageMounts = async () => {
  try {
    const res = await fetch(`${baseURL}/api/load-home-page-mounts`, {
      headers: {
        "X-API-TOKEN": process.env.FRONTEND_API_TOKEN ?? "",
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