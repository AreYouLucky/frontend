const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export const getPartners = async () => {
  try {
    const res = await fetch(
      `${baseURL}/api/load-partners`,
      {
        headers: {
          Accept: "application/json",
          "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN ?? "",
          "content-type": "application/json",
        },
        next: { revalidate: 1800 },
      }
    );

    if (!res.ok) {
      console.error("Get partners failed:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Get partners fetch error:", error);
    return null;
  }
};