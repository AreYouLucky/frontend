"use client";

import { useMemo } from "react";
import { ExpandingCards } from "./expanding-cards";
import { TopCount } from "@/types/models";

function formatViews(views: number | null) {
  if (!views) return "-";
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`;
  return `${views.toLocaleString()} views`;
}

export default function TopYouTubeExpanding({
  data,
}: {
  data: TopCount;
}) {
  const cards = useMemo(() => {
    if (!data?.top_10_most_viewed?.length) return [];

    return data.top_10_most_viewed.slice(0, 10).map((video) => ({
      title: video.title || "Untitled video",
      view_count: formatViews(video.view_count || 0),
      image: video.thumbnail || "",
      videoId: video.video_id || "",
      description: video.description || "",
    }));
  }, [data]);

  if (!cards.length) {
    return (
      <div className="rounded-2xl p-6 text-sm text-gray-300 bg-gray-900">
        No YouTube data available.
      </div>
    );
  }


  return (
    <div className="relative w-full min-w-0 ">

      <ExpandingCards
        cards={cards.map(({ title, view_count, image, videoId, description }) => ({
          title,
          view_count,
          image,
          href: `https://www.youtube.com/watch?v=${videoId}`,
          description,
          videoId
        }))}
        height="h-[150px] md:h-[160px] lg:h-[230px] "
        classNames={{
          card: "cursor-pointer",
        }}
        transitionDuration={0.35}
      />
    </div>
  );
}
