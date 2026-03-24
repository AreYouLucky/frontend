import React from 'react'
import { getProgramInfo } from '@/hooks/program/program-hooks';
import { Metadata } from 'next';
import { stripHtml } from '@/lib/utils';
export const dynamic = "force-dynamic";
import ProgramCard from '@/components/program-partials/program_card';
import FeaturedCard from '@/components/program-partials/featured_card';
import ProgramSeasons from '@/components/program-partials/program-seasons';
import ProgramPosts from '@/components/program-partials/program-posts';
import SetBg from '@/components/ui/set-bg';
type Props = {
    params: Promise<{ slug: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const data = await getProgramInfo(slug);
    const program = data?.program;

    if (!program) {
        return {
            title: "DOSTv",
            description: "program not found",
        };
    }

    const image = `/storage/images/program_images/thumbnails/${program.image}`;

    return {
        metadataBase: new URL("https://dostv.ph"),
        title: program.title,
        description: stripHtml(program.description),
        keywords: [
            "DOSTv Program",
            "Filipino science shows",
            stripHtml(program.description),
            program.title,
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
            title: program.title,
            description: stripHtml(program.description),
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: program.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: program.title,
            description: stripHtml(program.description),
            images: [image],
        },
        icons: {
            icon: "/storage/images/logos/logo.png",
        },
    };
}

export default async function ProgramPage({ params }: Props) {
    const { slug } = await params;
    const data = await getProgramInfo(slug);
    const program = data.program
    const featured = data.featured_post
    return (
        <div className="w-full lg:px-13 md:px-5 pt-12 md:pt-18 lg:pt-20 ">
            <SetBg thumbnail={`/storage/images/program_images/thumbnails/${program.image}`} />
            <div className="flex flex-col md:flex-row gap-4 items-start pb-8 ">
                <div className="flex-1 lg:pr-15 md:p-6 p-4 py-4 border-none md:border-r border-white/40 fade-up">
                    <ProgramCard program={program} total={data.total} />
                </div>

                <div className=" md:w-120 w-60 flex flex-col gap-2 md:px-2 lg:px-10 px-4 py-3 ">
                    <FeaturedCard featured={featured} />
                </div>
            </div>
            <div className=" w-full lg:px-10 md:px-5 px-3">
                <div className="border-b border-white/40"></div>
            </div>
            <div className='w-full pt-6 '>
                <ProgramSeasons code={program.code} className="px-4 md:px-0" />
            </div>
            <div className='flex flex-col rounded-md w-full lg:px-10 md:px-5 px-3 '>
                <ProgramPosts code={program.code} />
            </div>
        </div>
    )
}
