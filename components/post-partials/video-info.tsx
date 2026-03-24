import React from 'react'
import { PostModel } from '@/types/models'
import LinkPlayer from '../ui/link-player';
import { convertLongDate } from '@/lib/utils';
export default function VideoInfo({ currentPost, className, children }: { currentPost: PostModel, className: string, children: React.ReactNode }) {

    function popTags(text: string) {
        if (!text) return
        const array = text.split(",");
        return <>{array.map((item, index) => <span key={index} className='text-[13px] px-3 py-1 ml-px bg-[#004a92]/50 border border-white/40  tracking-wide rounded-full'>{item}</span>)}</>
    }
    return (
        <div className={`w-full border-b border-white/40 ${className}`}>
            <div className="w-full">
                <LinkPlayer url={currentPost.url as string} platform={currentPost.platform as string} />
                <div className='w-full relative  text-white flex flex-col md:flex-row md:pt-5  md:pb-6 py-4 lg:px-10 md:px-8 px-1 justify-between'>
                    <div className="md:pr-12 border-b md:border-b-0  pb-6 md:pb-0 border-white/40 flex flex-col  fade-right">
                        <div className='md:py-5 py-2'>
                            <h1 className="md:text-4xl text-3xl font-bold inter-bold relative tracking-wide pl-4 ">{currentPost.title}</h1>
                            <div className="px-4 mt-2">
                                <div className="flex md:gap-5 gap-2 items-center md:mt-2">
                                    <div className="md:text-[17px] text-[15px] md:my-2 my-1 md:pr-5 pr-2  border-r border-white text-white font-bold   poppins-semibold w-fit ">
                                        {currentPost.post_program.title}
                                    </div>
                                    <div className="text-[14px] font-semibold ">{convertLongDate(currentPost?.date_published as string)}</div>
                                </div>
                                {currentPost?.guest && <p className="text-[14px] font-semibold">with {currentPost?.guest}</p>}

                                <div
                                    className="text-justify poppins-light md:text-[15px] text-[13px] tracking-wide leading-relaxed  bg-transparent text-white/90 "
                                    dangerouslySetInnerHTML={{
                                        __html: currentPost?.content ?? "",
                                    }}
                                />
                            </div>
                            <p className='text-sm poppins-semibold md:mt-7 mt-3 m mb-2 flex gap-1 flex-wrap px-4'>{popTags(currentPost?.tags as string)}</p>
                        </div>

                    </div>
                    <div className=" md:px-6 px-4 py-4 md:py-0 flex justify-center flex-col border-none md:border-l border-white/40">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
