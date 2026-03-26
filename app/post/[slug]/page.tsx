import { Metadata } from "next";
import { getPost } from "@/hooks/post/post-hooks";
import VideoInfo from "@/components/post-partials/video-info";
import { PostModel } from "@/types/models";
import SetBg from "@/components/ui/set-bg";
import SimilarPost from "@/components/post-partials/similar-post";
import UpNext from "@/components/post-partials/up-next";
import ProgramRelatedPosts from "@/components/post-partials/program-related-posts";
type Props = {
  params: Promise<{ slug: string }>;
};

const baseURL = process.env.NEXT_PUBLIC_URL || "http://znjvbnrlbmq.dostv.ph";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const data = await getPost(slug);
  const post = data?.post;

  if (!post) {
    return {
      title: "DOSTv",
      description: "Post not found",
    };
  }

  const image = `${baseURL}/storage/images/post_images/thumbnails/${post.thumbnail}`;

  return {
    metadataBase: new URL(`${baseURL}`),
    title: post.title,
    description: post.excerpt,
    keywords: [
      "DOSTv",
      "DOSTv Video",
      "DOSTv Post",
      "DOST Philippines",
      "science Philippines",
      "technology Philippines",
      "innovation",
      "science for the people",
      "DOST programs",
      "Filipino science shows",
      post.title,
      post.tags,
      post.excerpt,
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
    icons: {
      icon: `${baseURL}/storage/images/logos/logo.png`,
    },
  };
}



export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const posts = await getPost(slug);
  const currentPost: PostModel = posts.post
  const relatedPosts: PostModel[] = posts.related

  return (
    <div className="w-full pt-16 md:pt-16 lg:pt-16 bg-linear-to-b from-black/80 to-transparent from-0% to-20%">
      <SetBg thumbnail={`/storage/images/post_images/thumbnails/${currentPost.thumbnail}`} />
      <div className="flex  flex-col gap-2 mb-8">
        <VideoInfo currentPost={currentPost}  url={`${baseURL}/post/${currentPost.slug}`} className="mb-4 w-full">
          <div className="w-65 md:px-3 z-50">
            <div className=" lg:text-[18px] md:text-[13px] text-[11px] font-bold tracking-widest text-white uppercase">
              Up NEXT
            </div>
            {relatedPosts.slice(0, 1).map((related, index) => (
              <UpNext post={related} key={index} />
            ))}
          </div>

        </VideoInfo>
        <SimilarPost relatedPosts={relatedPosts} className=" px-4 md:px-0" />
        <div className="py-6">
          <div className="border-b border-white/40"></div>
        </div>
        <ProgramRelatedPosts code={currentPost.post_program.code as string} program_name={currentPost.post_program.title} />
      </div>
    </div>
  );
}