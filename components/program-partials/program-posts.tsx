"use client";

import React, { useRef, useEffect, useState } from "react";
import { LayoutGroup } from "framer-motion";
import { MorphingCard } from "../ui/morphing-card";
import HoverCard from "../ui/hover-card";
import { convertLongDate, convertShortDate } from "@/lib/utils";
import { useGetProgramPosts } from "@/hooks/program/program-hooks";
import CardLoading from "../ui/card-loading";
export default function ProgramPosts({ code }: { code: string }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetProgramPosts(code);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const posts =
    data?.pages.flatMap((page) => page.posts.data) ?? [];

  const program = data?.pages[0]?.program;

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="w-full">
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
              program={program?.title ?? ""}
              program_slug={""}
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
                program_code={""}
              />
            </MorphingCard>
          ))}
        </div>
      </LayoutGroup>

      {isFetchingNextPage && <CardLoading />}

      <div ref={observerRef} className="h-10 w-full mt-20" />
    </div>
  );
}