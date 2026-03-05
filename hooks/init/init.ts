const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const loadNavigationData = async () => {
  try {
    const res = await fetch(`${baseURL}/api/load-navigation-data`, {
      headers: {
        "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN ?? "",
        "content-type": "application/json",
      },
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      console.error("Navigation API failed:", res.status);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Navigation fetch error:", error);
    return [];
  }
};