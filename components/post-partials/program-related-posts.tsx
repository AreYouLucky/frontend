"use client"
import { LayoutGroup } from "framer-motion";
import { MorphingCard } from "@/components/ui/morphing-card";
import { convertShortDate, convertLongDate } from "@/lib/utils";
import { useGetProgramRelatedPosts } from "@/hooks/post/post-hooks";
import { useState } from "react";
import HoverCard from "../ui/hover-card";
import PageLoading from "../ui/page-loading";
import Link from "next/link";

export default function ProgramRelatedPosts({ code, program_name }: { code: string, program_name: string }) {
    const { data: relatedPosts, isFetching } = useGetProgramRelatedPosts(code);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    if (isFetching) return <PageLoading />
    return (
        <div className={`flex flex-col  rounded-md  w-full lg:px-10 py-2  md:px-5 px-3 lg:mb-20`}>
            <div className="flex justify-between">
                <h2 className=" lg:text-[17px] md:text-[13px] text-[11px] font-bold tracking-widest text-white uppercase lg:mb-6 md:mb-4 mb-2">
                    {program_name}
                </h2>
                <Link href={`/program/${code}`} className='font-semibold  h-fit rounded-sm px-4 py-px text-[12px] border border-white/40 text-white'>
                    View All
                </Link>
            </div>
            <LayoutGroup>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-6 gap-4">
                    {relatedPosts?.map((related) => (
                        <MorphingCard
                            key={related.post_id}
                            id={related.post_id as number}
                            title={related.title as string}
                            excerpt={related.excerpt as string}
                            date_published={convertShortDate(related.date_published as string)}
                            slug={related.slug as string}
                            program={related.post_program.title}
                            program_slug={related.post_program.code as string}
                            categories={related.categories}
                            thumbnail={related.thumbnail as string}
                            trailer={related.trailer as string}
                            banner={related.banner as string}
                            guest={related.guest as string}
                            isExpanded={expandedId === related.post_id}
                            onExpand={() => setExpandedId(related.post_id as number)}
                            onCollapse={() => setExpandedId(null)}
                        >
                            <HoverCard
                                title={related.title ?? ""}
                                description={related.excerpt ?? ""}
                                image={related.thumbnail ?? ""}
                                date={convertLongDate(related.date_published ?? '')}
                                video={related.trailer ?? ""}
                                banner={related.banner ?? ""}
                                categories={related.categories}
                                program_code={code ?? ""}
                            />
                        </MorphingCard>

                    ))}
                </div>
            </LayoutGroup>
        </div>
    )
}
