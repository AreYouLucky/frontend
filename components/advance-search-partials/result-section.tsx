"use client";
import { useRef, useEffect, useState } from "react";
import HoverCard from "../ui/hover-card";
import { convertLongDate } from "@/lib/utils";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { PostModel } from "@/types/models";
import { LoaderCircle } from "lucide-react";
import FilterEmpty from "./result-partials/filter-empty";
import EmptyResult from "./result-partials/empty-result";
import CardLoading from "../ui/card-loading";
import { LayoutGroup } from "framer-motion";
import { MorphingCard } from "../ui/morphing-card";
import { convertShortDate } from "@/lib/utils";

type SearchPostsResponse = {
    current_page: number;
    last_page: number;
    data: PostModel[];
    total: number;
};
type ResultSectionProps = {
    data: InfiniteData<SearchPostsResponse> | undefined;
    fetchNextPage: () => Promise<unknown>;
    hasNextPage?: boolean;
    hasActiveFilters: boolean;
    isFetching: boolean;
    isFetchingNextPage: boolean;
    status: UseInfiniteQueryResult<SearchPostsResponse>["status"];
};

export default function ResultSection({
    data,
    fetchNextPage,
    hasNextPage,
    hasActiveFilters,
    isFetching,
    isFetchingNextPage,
    status,
}: ResultSectionProps) {
    const observerRef = useRef<HTMLDivElement | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const posts = data?.pages.flatMap((p) => p.data) ?? [];
    const total = data?.pages[0]?.total ?? 0;

    useEffect(() => {
        const el = observerRef.current;
        if (!el || !hasActiveFilters || !hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [fetchNextPage, hasActiveFilters, hasNextPage, isFetchingNextPage]);

    return (
        <div className="w-full pb-16 pt-5 text-white">
            {!hasActiveFilters && (
                <FilterEmpty />
            )}

            {status === "pending" && hasActiveFilters && <CardLoading />}
            {posts.length > 0 && (
                <div className=" space-y-5">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <h3 className="mt-2 text-2xl font-bold md:text-3xl">
                                Explore the DOSTv Library
                            </h3>

                            <p className="mt-1 text-sm text-white/55">
                                Scroll to reveal more science stories, innovations, and breakthroughs.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-white/90  px-4 py-2 text-sm text-white/70 ">
                            <span className="font-medium">{total}</span>
                            <span className="text-white/50">results</span>
                        </div>

                    </div>
                    <LayoutGroup>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-6 gap-4">
                            {posts.map((post, index) => (
                                <MorphingCard
                                    key={index}
                                    id={post.post_id as number}
                                    title={post.title as string}
                                    excerpt={post.excerpt as string}
                                    date_published={convertShortDate(post.date_published as string)}
                                    slug={post.slug as string}
                                    program={post.post_program?.title ?? ""}
                                    program_slug={post.post_program?.code ?? ""}
                                    categories={post.categories}
                                    thumbnail={post.thumbnail as string}
                                    trailer={post.trailer}
                                    banner={post.banner}
                                    guest={post.guest}
                                    isExpanded={expandedId === post.post_id}
                                    onExpand={() => setExpandedId(post.post_id)}
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
                                        program_code={post.post_program.code}
                                    />
                                </MorphingCard>
                            ))}
                        </div>
                    </LayoutGroup>
                    <div className="mt-8  px-5 py-8 ">

                    </div>
                </div>
            )}

            {hasActiveFilters && status !== "pending" && posts.length === 0 && !isFetching && (
                <EmptyResult />
            )}

            {isFetchingNextPage && (
                <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/70">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Loading more results...
                </div>
            )}

            {hasActiveFilters && hasNextPage && (
                <div ref={observerRef} className="h-10 w-full mt-10" />
            )}
        </div>
    );
}
