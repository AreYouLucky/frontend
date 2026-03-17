"use client"
import React from 'react'
import { useGetFeaturedProgramsPosts } from '@/hooks/home/home-mount'
import SliderSection from './slider-section'
import Link from 'next/link';
import PageLoading from '../ui/page-loading';
export default function ProgramSection() {

    const { data: programs, isFetching } = useGetFeaturedProgramsPosts();

    if (isFetching) {
        return (
            <div className="w-full  " >
                <PageLoading />
                <div className="lg:px-8 md:px-5 px-5 md:pt-10 md:pb-8 pt-7 pb-4">
                    <div className="border-b border-white/40"></div>
                </div>
                <PageLoading />
                <div className="lg:px-8 md:px-5 px-5 md:pt-10 md:pb-8 pt-7 pb-4">
                    <div className="border-b border-white/40"></div>
                </div>
                <PageLoading />
            </div>
        )
    }
    return (
        <>
            {programs?.map((program, index) => (
                <div key={index}>
                    {program.episodes && program?.episodes?.length > 0 &&
                        <>
                            <div className='relative'>
                                <div className='px-2 lg:px-5 w-full flex flex-row justify-between items-center md:mb-6 mb-2'>
                                    <h1 className=" lg:text-[20px] md:text-[15px] text-[13px] font-bold  tracking-wider px-5 border-l border-white/40 text-white relative uppercase ">
                                        {program.title}
                                    </h1>
                                    <Link href={`/program/${program.code}`} className='font-semibold  h-fit rounded-lg px-4 md:py-1.5 py-1 text-[12px] md:text-[15px] border border-white/40 text-white'>
                                        View All
                                    </Link>
                                </div>
                                <div className='relative'>
                                    <SliderSection posts={program.episodes ?? []} program={program.title} program_code={program.code} />
                                </div>
                            </div>
                            <div className="lg:px-8 md:px-5 px-5 md:pt-10 md:pb-8 pt-7 pb-4">
                                {/* <div className="border-b border-white/40"></div> */}
                            </div>
                        </>
                    }
                </div>
            ))}
        </>
    )
}
