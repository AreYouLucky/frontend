"use client"
import SliderSection from '@/components/home-partials/slider-section'
import { homeMountProps } from '@/types/models'
import ProgramSection from './program-section'
export default function HomeContent({ props }: { props: homeMountProps }) {
    return (
        <div className=' flex flex-col lg:gap-8 md:gap-2 gap-1 md:py-2 py-1'>
            <div className=''>
                <div className='lg:pb-10 md:pb-8 pb-5  pt-2'>
                    <div className='px-2 lg:px-5 '>
                        <h1 className=" lg:text-[20px] md:text-[15px] text-[13px] font-bold md:mb-4 mb-2 tracking-wider px-5 border-l border-white/40 text-white relative uppercase ">
                            Editor’s Picks
                        </h1>
                    </div>
                    <div className='relative'>
                        <SliderSection posts={props.featured_posts} />
                    </div>
                </div>
                <div className='lg:pb-10 md:pb-8 pb-5'>
                    <div className='px-2 lg:px-5 '>
                        <h1 className=" lg:text-[20px] md:text-[15px] text-[13px] font-bold md:mb-2 mb-2 tracking-wider px-5 border-l border-white/40 text-white relative uppercase ">
                            Must-Watch Programs
                        </h1>
                    </div>
                    <ProgramSection className=''/>
                </div>
                <div>
                    <div className='px-2 lg:px-5'>
                        <h1 className=" lg:text-[20px] md:text-[15px] text-[13px] font-bold md:mb-4 mb-2 tracking-wider px-5 border-l border-white/40 text-white relative uppercase ">
                            New & Trending
                        </h1>
                    </div>
                    <div className='relative'>
                        <SliderSection posts={props.recent_posts} />
                    </div>
                </div>
            </div>
        </div>
    )
}
