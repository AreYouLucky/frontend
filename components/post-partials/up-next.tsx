"use client"
import { convertShortDate, convertLongDate } from '@/lib/utils'
import { MorphingCard } from '@/components/ui/morphing-card'
import { useState } from 'react'
import { PostModel } from '@/types/models'
import HoverCard from '../ui/hover-card'
export default function UpNext({ post }: { post: PostModel }) {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    return (
        <MorphingCard
            id={post.post_id as number}
            title={post.title as string}
            excerpt={post.excerpt as string}
            date_published={convertShortDate(post.date_published as string)}
            slug={post.slug as string}
            program={post.post_program.title}
            program_slug={post.post_program.code as string}
            categories={post.categories}
            thumbnail={post.thumbnail as string}
            trailer={post.trailer as string}
            banner={post.banner as string}
            guest={post.guest as string}
            isExpanded={expandedId === post.post_id}
            onExpand={() => setExpandedId(post.post_id as number)}
            onCollapse={() => setExpandedId(null)}
        >
            <div
                className="flex flex-col gap-3 p-2  text-white hover:scale-105 duration-300"
            >
                <HoverCard
                    title={post.title ?? ""}
                    description={post.excerpt ?? ""}
                    image={post.thumbnail ?? ""}
                    date={convertLongDate(post.date_published ?? '')}
                    video={post.trailer ?? ""}
                    banner={post.banner ?? ""}
                    categories={post.categories}
                    program_code={post.post_program.code ?? ""}
                />

            </div>
        </MorphingCard>
    )
}
