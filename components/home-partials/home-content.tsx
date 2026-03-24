"use client"
import SliderSection from '@/components/home-partials/slider-section'
import { homeMountProps } from '@/types/models'
import ProgramSection from './program-section'
import YoutubeList from './youtube/yt-list'
import WeatherForecast from './weather-forecast'
import Weather from './weather'
import DailyVerse from './verse'
export default function HomeContent({ props }: { props: homeMountProps }) {

    return (
        <div className=' flex flex-col lg:gap-8 md:gap-2 gap-1 md:py-2 py-3'>
            <div className=''>
                <div className='lg:pb-15 md:pb-8 pb-8'>
                    <div className='px-2 lg:px-5 '>
                        <h1 className=" lg:text-[20px] md:text-[15px] text-[13px] font-bold md:mb-6 mb-2 tracking-wider pl-1.5 md:px-5 border-l border-white/40 text-white relative uppercase ">
                            Featured Videos
                        </h1>
                    </div>
                    <div className='relative'>
                        {/* <div className="h-1 w-full bg-linear-to-r from-transparent via-[#00aeef] to-transparent" /> */}
                        <SliderSection posts={props.featured_posts} />
                    </div>
                </div>
                <div className='lg:pb-6 md:pb-4 pb-2'>
                    <YoutubeList />
                </div>
                <div>
                    <div className='px-2 lg:px-5'>
                        <h1 className=" lg:text-[20px] md:text-[15px] text-[13px] font-bold md:mb-6 mb-2 tracking-wider px-5 border-l border-white/40 text-white relative uppercase ">
                            New & Trending
                        </h1>
                    </div>
                    <div className='relative'>
                        <SliderSection posts={props.recent_posts} />
                    </div>
                </div>
                <div className="lg:px-8 md:px-5 px-5 md:pt-10 md:pb-8 pt-7 pb-4">
                    {/* <div className="border-b border-white/40"></div> */}
                </div>
                <div className='z-10'>
                    <ProgramSection />
                </div>

                <div className='grid lg:grid-cols-3 w-full lg:px-15 md:px-5 px-3 lg:gap-6 gap-4 '>
                    <div className='lg:col-span-2 bg-zinc-900/30 rounded-lg py-8 shadow-sm shadow-white/80'>
                        <div>
                            <h1 className=" lg:text-[24px] md:text-[20px] text-[18px] font-bold md:mb-6 mb-2 tracking-wider px-5  text-white text-center uppercase ">
                                Weather Forecast
                            </h1>
                        </div>
                        <div className='w-full flex lg:flex-row flex-col items-center justify-center'>

                            <WeatherForecast />
                            <Weather />
                        </div>
                    </div>
                    <div className='flex justify-center items-center bg-zinc-900/30 rounded-lg p-8 shadow-sm shadow-white/80'>
                        <DailyVerse />
                    </div>

                </div>

            </div>
        </div>
    )
}
