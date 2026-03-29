"use client";

import { useState } from "react";
import SeasonDropdown from "./seasons-dropdown";
import { MorphingCard } from "@/components/ui/morphing-card";
import { convertLongDate, convertShortDate } from "@/lib/utils";
import { LayoutGroup } from "framer-motion";
import { useGetProgramSeasonsPosts } from "@/hooks/program/program-hooks";
import PageLoading from "../ui/page-loading";
import HoverCard from "../ui/hover-card";

export default function ProgramSeasons({
    code,
    className,
}: {
    code: string;
    className?: string;
}) {
    const { data, isFetching } = useGetProgramSeasonsPosts(code);
    const [expandedId, setExpandedId] = useState<number | null>();
    const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>();
    const [expandedSeasons, setExpandedSeasons] = useState<number[]>([]);

    const toggleSeason = (seasonId: number) => {
        setExpandedSeasons((prev) =>
            prev.includes(seasonId)
                ? prev.filter((id) => id !== seasonId)
                : [...prev, seasonId]
        );
    };

    if (isFetching) return <PageLoading />;

    const seasons = data?.seasons ?? [];
    const activeSeason =
        seasons.find((season) => season.id === selectedSeasonId) ?? seasons[0];

    if (!activeSeason || !data) return null;

    const activeSeasonId = activeSeason.id as number;
    const expanded = expandedSeasons.includes(activeSeasonId);
    const posts = expanded ? activeSeason.posts : activeSeason.posts.slice(0, 6);

    return (
        <div
            className={`flex w-full flex-col rounded-md px-3 py-2 md:px-5 lg:px-10 ${className ?? ""}`}
        >
            <div className="mb-5 flex flex-col-reverse gap-3 md:mb-6 md:flex-row md:items-end md:justify-between">
                <div>
                <h3 className="mb-3 text-[12px] font-bold uppercase tracking-widest text-white md:mb-3 md:text-[13px] lg:mb-4 lg:text-[17px]">
                    {activeSeason.title}
                </h3>

                    <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 md:text-[11px]">
                        {activeSeason.description === 'NA' ? 'No description' : activeSeason.description}
                    </p>
                </div>

                <div className="w-full md:max-w-xs">
                    <label
                        htmlFor="program-season-select"
                        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60"
                    >
                        Choose season
                    </label>
                    <div className="relative pb-4 md:pb-0">
                        <SeasonDropdown
                            seasons={seasons}
                            value={activeSeasonId}
                            onChange={(id) => {
                                setSelectedSeasonId(id);
                                setExpandedId(null);
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6 w-full">

                <LayoutGroup>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
                        {posts.map((post) => (
                            <MorphingCard
                                key={post.post_id}
                                id={post.post_id as number}
                                title={post.title as string}
                                excerpt={post.excerpt as string}
                                date_published={convertShortDate(post.date_published as string)}
                                slug={post.slug as string}
                                program={data.program.title}
                                program_slug={data.program.code as string}
                                categories={post.categories}
                                thumbnail={post.thumbnail as string}
                                trailer={post.trailer as string}
                                banner={post.banner as string}
                                guest={post.guest as string}
                                isExpanded={expandedId === post.post_id}
                                onExpand={() => setExpandedId(post.post_id as number)}
                                onCollapse={() => setExpandedId(null)}
                            >
                                <HoverCard
                                    title={post.title ?? ""}
                                    description={post.excerpt ?? ""}
                                    image={post.thumbnail ?? ""}
                                    date={convertLongDate(post.date_published ?? "")}
                                    video={post.trailer ?? ""}
                                    banner={post.banner ?? ""}
                                    categories={post.categories}
                                    program_code={data.program.code ?? ""}
                                />
                            </MorphingCard>
                        ))}
                    </div>
                </LayoutGroup>

                {activeSeason.posts.length > 6 && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => toggleSeason(activeSeasonId)}
                            className="rounded-full px-4 py-1 text-xs font-semibold tracking-wider text-white/80 transition duration-300 hover:scale-105 hover:text-white md:text-sm"
                        >
                            {expanded ? "See Less" : "See More"}
                        </button>
                    </div>
                )}

                <div className="pt-7 md:pt-4">
                    <div className="border-b border-white/40"></div>
                </div>
            </div>
        </div>
    );
}
