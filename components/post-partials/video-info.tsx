import React from 'react'
import { PostModel } from '@/types/models'
import LinkPlayer from '../ui/link-player';
import { convertLongDate } from '@/lib/utils';
export default function VideoInfo({ currentPost, className, children }: { currentPost: PostModel, className: string, children: React.ReactNode }) {

    function popTags(text: string) {
        if (!text) return
        const array = text.split(",");
        return <>{array.map((item, index) => <span key={index} className='text-[13px] px-3 py-1 ml-px border border-white/40   tracking-wide rounded-full'>{item}</span>)}</>
    }
    return (
        <div className={`w-full border-b border-white/40 ${className}`}>
            <div className="w-full">
                <LinkPlayer url={currentPost.url as string} platform={currentPost.platform as string} />
                <div className='w-full relative  text-white flex flex-col md:flex-row md:pt-5  md:pb-6 py-4 lg:px-10 md:px-8 justify-between'>
                    <div className="md:pr-12 border-b md:border-b-0  pb-6 md:pb-0 border-white/40 flex flex-col  fade-right">
                        <div className='py-5'>
                            <h1 className="md:text-4xl text-xl font-bold inter-bold relative tracking-wide pl-4 ">{currentPost.title}</h1>
                            <div className="px-4">
                                <div className="flex gap-5 items-center md:mt-2">
                                    <div className="text-[17px] md:my-2 my-1 pr-5  border-r border-white text-white font-bold   poppins-semibold w-fit ">
                                        {currentPost.post_program.title}
                                    </div>
                                    <div className="text-[14px] font-semibold ">{convertLongDate(currentPost?.date_published as string)}</div>
                                </div>
                                {currentPost?.guest && <p className="text-[12px]">with {currentPost?.guest}</p>}

                                <div
                                    className="text-justify poppins-light md:text-[15px] text-[13px] tracking-wide leading-relaxed  bg-transparent text-white/90 "
                                    dangerouslySetInnerHTML={{
                                        __html: currentPost?.content ?? "",
                                    }}
                                />
                            </div>
                                <p className='text-sm poppins-semibold mt-7 mb-2 flex gap-1 flex-wrap'>{popTags(currentPost?.tags as string)}</p>
                        </div>

                    </div>
                    <div className=" md:px-6 px-4 py-4 md:py-0 flex justify-center flex-col border-l border-white/40">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
