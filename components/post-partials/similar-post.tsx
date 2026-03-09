"use client";
import { useState } from 'react';
import { MorphingCard } from '@/components/ui/morphing-card'
import { convertLongDate, convertShortDate } from '@/lib/utils'
import { PostModel } from '@/types/models'
import { LayoutGroup } from 'framer-motion';
import HoverCard from '../ui/hover-card';
export default function SimilarPost({ relatedPosts, className }: { relatedPosts: PostModel[], className: string }) {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    return (
        <div className={`flex flex-col  rounded-md  w-full  lg:px-10 py-2  md:px-5 px-3 ${className}`}>
            <h2 className=" lg:text-[17px] md:text-[13px] text-[11px] font-bold tracking-widest text-white uppercase lg:mb-4 md:mb-3 mb-3">
                You might also like
            </h2>
            <LayoutGroup>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-6 gap-4 ">
                    {relatedPosts.slice(1, 7).map((related) => (
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
                                program_code={related.post_program.code ?? ""}
                            />

                        </MorphingCard>

                    ))}
                </div>
            </LayoutGroup>
        </div>
    )
}
