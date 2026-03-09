"use client"
import React from 'react'
import HoverCard from '../ui/hover-card';
import { PostModel } from '@/types/models'
import { RiVideoOnAiFill } from "react-icons/ri";
import { convertLongDate } from '@/lib/utils';
import PostPreview from '../ui/post-preview';
import Modal from '../ui/modal';

export default function FeaturedCard({ featured }: { featured: PostModel }) {
    const [activePost, setActivePost] = React.useState<PostModel | null>(null);

    return (
        <>
            <span className='w-fit flex items-center justify-center gap-2 text-white/90 rounded-full text-base md:text-lg lg:text-xl py-1 font-bold'>
                <RiVideoOnAiFill /> Featured Episode
            </span>
            <div
                className='rounded-lg border border-white/30 cursor-pointer'
                onClick={() => setActivePost(featured)}
            >
                <HoverCard
                    title={featured.title ?? ""}
                    description={featured.excerpt ?? ""}
                    image={featured.thumbnail ?? ""}
                    date={convertLongDate(featured.date_published ?? '')}
                    video={featured.trailer ?? ""}
                    banner={featured.banner ?? ""}
                    categories={featured.categories}
                />
            </div>

            <div>
                <h1 className='md:text-2xl text-xl font-bold leading-snug text-white my-2'>
                    {featured.title}
                </h1>
                <h3 className='text-xs md:text-sm text-white/80 flex items-center gap-2 mt-1 font-semibold w-fit rounded-lg py-px my-1'>
                    {convertLongDate(featured?.date_published as string)}
                </h3>
                <p className='line-clamp-3 text-white/90 md:text-[13px] lg:text-[14.2px] text-justify'>
                    {featured.excerpt}
                </p>
            </div>
            <Modal
                open={activePost !== null}
                onClose={() => setActivePost(null)}
            >
                {activePost && (
                    <PostPreview
                        title={activePost.title ?? ""}
                        date_published={activePost.date_published ?? ""}
                        slug={activePost.slug ?? ""}
                        program={activePost.post_program?.title ?? ""}
                        excerpt={activePost.excerpt ?? ""}
                        thumbnail={activePost.thumbnail ?? ""}
                        banner={activePost.banner}
                        trailer={activePost.trailer}
                        guest={activePost.guest}
                        categories={activePost.categories}
                    />
                )}
            </Modal>
        </>
    )
}