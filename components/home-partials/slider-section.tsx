"use client"
import { useState } from "react"
import { PostModel } from "@/types/models"
import HorizontalSlider from "@/components/ui/horizontal-slider"
import { convertLongDate } from "@/lib/utils"
import HoverCard from "@/components/ui/hover-card"
import Modal from "@/components/ui/modal"
import PostPreview from "@/components/ui/post-preview"

export default function SliderSection({ posts, program= "", program_code = ""}: {
    posts: PostModel[], program?: string, program_code?: string
}) {

    const [activePost, setActivePost] = useState<PostModel | null>(null)

    console.log("posts", activePost)

    return (
        <div className="relative w-full min-w-0">
            <HorizontalSlider>
                {posts.map((post) => (
                    <div
                        key={post.post_id}
                        className="keen-slider__slide relative overflow-visible hover:z-40 cursor-pointer "
                        onClick={() => setActivePost(post)}
                    >
                        <HoverCard
                            title={post.title ?? ""}
                            description={post.excerpt ?? ""}
                            image={post.thumbnail ?? ""}
                            date={convertLongDate(post.date_published ?? '')}
                            video={post.trailer ?? ""}
                            banner={post.banner ?? ""}
                            categories={post.categories}
                            program_code={ program_code !== "" ? program_code : post.post_program.code}
                        />
                    </div>
                ))}
            </HorizontalSlider>

            <Modal
                open={activePost !== null}
                onClose={() => setActivePost(null)}
            >
                {activePost && (
                    <PostPreview
                        title={activePost.title ?? ""}
                        date_published={activePost.date_published ?? ""}
                        slug={activePost.slug ?? ""}
                        program={program ?? activePost.post_program.title }
                        program_slug={ program_code !== "" ? program_code : activePost.post_program.code}
                        excerpt={activePost.excerpt ?? ""}
                        thumbnail={activePost.thumbnail ?? ""}
                        banner={activePost.banner}
                        trailer={activePost.trailer}
                        guest={activePost.guest}
                        categories={activePost.categories}
                    />
                )}
            </Modal>

        </div>
    )
}