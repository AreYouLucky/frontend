"use client";
import { useState } from "react";
import { MorphingCard } from "@/components/ui/morphing-card";
import { convertLongDate, convertShortDate } from "@/lib/utils";
import { LayoutGroup } from "framer-motion";
import { useGetProgramSeasonsPosts } from "@/hooks/program/program-hooks";
import PageLoading from "../ui/page-loading";
import HoverCard from "../ui/hover-card";

export default function ProgramSeasons({ code, className, }: { code: string; className?: string; }) {
    const { data, isFetching } = useGetProgramSeasonsPosts(code);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [expandedSeasons, setExpandedSeasons] = useState<number[]>([]);
    const toggleSeason = (seasonId: number) => {
        setExpandedSeasons((prev) =>
            prev.includes(seasonId)
                ? prev.filter((id) => id !== seasonId)
                : [...prev, seasonId]
        );
    };

    if(isFetching) return <PageLoading />

    return (
        <div
            className={`flex flex-col rounded-md w-full lg:px-10 py-2 md:px-5 px-3 ${className}`}
        >
            {data?.seasons?.map((season) => {
                const expanded = expandedSeasons.includes(season.id as number);
                const posts = expanded ? season.posts : season.posts.slice(0, 6);

                return (
                    <div className="w-full mb-6" key={season.id}>
                        <h2 className="lg:text-[17px] md:text-[13px] text-[11px] font-bold tracking-widest text-white uppercase lg:mb-4 md:mb-3 mb-3">
                            {season.title}
                        </h2>
                        <LayoutGroup>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-6 gap-4">
                                {posts.map((post) => (
                                    <MorphingCard
                                        key={post.post_id}
                                        id={post.post_id as number}
                                        title={post.title as string}
                                        excerpt={post.excerpt as string}
                                        date_published={convertShortDate(
                                            post.date_published as string
                                        )}
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
                                            date={convertLongDate(
                                                post.date_published ?? ""
                                            )}
                                            video={post.trailer ?? ""}
                                            banner={post.banner ?? ""}
                                            categories={post.categories}
                                            program_code={data.program.code ?? ""}
                                        />
                                    </MorphingCard>
                                ))}
                            </div>
                        </LayoutGroup>

                        {season.posts.length > 6 && (
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => toggleSeason(season.id as number)}
                                    className="text-xs md:text-sm text-white/80 hover:text-white  px-4 py-1 rounded-full font-semibold tracking-wider cursor-pointer
                                    hover:scale-105 duration-300"
                                >
                                    {expanded ? "See Less" : "See More"}
                                </button>
                            </div>
                        )}
                        <div className=" md:pt-4  pt-7">
                            <div className="border-b border-white/40"></div>
                        </div>

                    </div>
                );
            })}
        </div>
    );
}