"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Crown, PlayCircle } from "lucide-react";
import { TopCount } from "@/types/models";

function formatViews(views: number | null) {
    if (!views) return "-";
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
    if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`;
    return `${views.toLocaleString()} views`;
}

function trimText(text: string, max: number) {
    if (!text) return "";
    return text.length > max ? text.slice(0, max) + "..." : text;
}

export default function TopYouTubeListSm({

    data,
}: {
    data: TopCount;
}) {
    const [showAll, setShowAll] = useState(false);

    const videos = useMemo(() => {
        return data?.top_10_most_viewed?.slice(0, 10) || [];
    }, [data]);

    if (!videos.length) {
        return (
            <div className="rounded-2xl p-6 text-sm text-gray-300 bg-gray-900">
                No YouTube data available.
            </div>
        );
    }

    const topOne = videos[0];
    const rest = videos.slice(1);

    const visibleRest = showAll ? rest : rest.slice(0, 4); // 1 + 4 = 5 initially

    return (
        <div className="w-full h-full py-4 flex flex-col gap-3  rounded-lg shadow-lg font-poppins">

            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-black text-white">
                        <Crown className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-[14px] tracking-wide text-white font-bold uppercase">
                            Top YouTube Videos
                        </h3>
                        <p className="text-[11px] text-slate-300">
                            Ranked by view count
                        </p>
                    </div>
                </div>

                <span className="px-2.5 py-1 rounded-lg  text-[11px] font-medium text-slate-50 uppercase">
                    2026
                </span>
            </div>

            {/* Top 1 */}
            <Link
                href={`https://www.youtube.com/watch?v=${topOne.video_id}`}
                target="_blank"
                className="relative flex items-center gap-3 p-3 rounded-2xl border bg-zinc-950 border-white/30 text-white"
            >
                <div className="relative w-28 h-20 rounded-xl overflow-hidden">
                    <Image
                        src={topOne.thumbnail || ""}
                        alt={topOne.title || ""}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <PlayCircle className="w-8 h-8" />
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-semibold line-clamp-2">
                        {topOne.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-slate-300 line-clamp-2">
                        {trimText(topOne.description || "", 90)}
                    </p>
                    <span className="mt-2 inline-block text-[10px] px-2 py-0.5 rounded-full bg-[#004a92]/60">
                        {formatViews(topOne.view_count)}
                    </span>
                </div>
            </Link>

            {/* List */}
            <div className="space-y-2 flex-1 overflow-hidden">
                {visibleRest.map((video, index) => (
                    <Link
                        key={video.video_id ?? index}
                        href={`https://www.youtube.com/watch?v=${video.video_id}`}
                        target="_blank"
                        className="flex items-center gap-2 p-2 hover:bg-gray-800 text-white hover:scale-105 duration-300 border-b border-gray-50/10"
                    >
                        <span className="w-5 h-5 rounded-full  flex items-center justify-center text-[11px] font-extrabold">
                            <span className=" text-[20px]
                                                [-webkit-text-stroke:1px_white] font-extrabold text-zinc-900/60 px-2 w-fit h-fit">
                                {index + 2}
                            </span>
                        </span>

                        <div className="relative aspect-video w-20 rounded-lg overflow-hidden border border-white/40">
                            <Image
                                src={video.thumbnail || ""}
                                alt={video.title || ""}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-medium line-clamp-2">
                                {trimText(video.title || "", 60)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Toggle */}
            {rest.length > 4 && (
                <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="mt-2 text-[11px] text-center text-white hover:text-sky-300 transition"
                >
                    {showAll ? "Show Less" : "Show More"}
                </button>
            )}
        </div>
    );
}