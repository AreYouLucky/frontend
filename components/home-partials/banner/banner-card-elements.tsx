import { BannerModel } from '@/types/models'
import { MdPageview } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import Image from 'next/image';
import { MdPermMedia } from "react-icons/md";
import { PiStarFourBold } from "react-icons/pi";
import { BsCollectionPlayFill } from "react-icons/bs";
import Link from 'next/link';

export default function BannerCardElements({ banner }: { banner: BannerModel }) {
    return (
        <div className='w-full bg-linear-to-b from-transparent via-transparent to-zinc-900 via-90% to-100%'>
            <div className="grid h-82 md:h-120 lg:h-180 w-full grid-cols-1 lg:grid-cols-5 md:gap-4 lg:gap-8 gap-3 md:p-6 p-4 lg:p-12 bg-linear-to-l lg:from-black/10 md:from-black/40 from-black/60 to-black/90 ">
                <div className="flex flex-col justify-center gap-2 md:gap-4 lg:col-span-2 lg:-mt-8 lg:pb-15 md:pb-10 fade-up pt-8 md:pt-0">
                    {banner?.highlight_text && [2, 6].includes(banner?.type) && (
                        <div className=" flex items-center gap-0.5 lg:gap-1 uppercase rounded px-1.5 md:px-2 lg:px-2.5 py-px md:py-0.5 bg-[#004a95]/50 w-fit text-[7px] md:text-[9.5px] lg:text-[10px] font-semibold tracking-wide opacity-90">
                            <FaCircleInfo className="text-[10px] md:text-[11px]" />
                            {banner.highlight_text}
                        </div>
                    )}

                    {banner?.icon ? (
                        <Image
                            src={`/storage/images/banners/icons/${banner?.icon}`}
                            alt={banner?.title ?? ""}
                            width={240}
                            height={120}
                            className="w-28 md:w-52 lg:w-60 object-contain"
                        />
                    ) : (
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight">
                            {banner?.title}
                        </h3>
                    )}

                    {banner?.type && [3, 4].includes(banner?.type) && (
                        <>
                            <div className="flex flex-wrap lg:gap-2 gap-1 text-[9px] md:text-[10.5px] lg:text-[12px] font-bold tracking-wide">
                                {banner?.highlight_text && (
                                    <div className="flex items-center justify-center gap-0.5 lg:gap-1 uppercase rounded-sm border border-sky-400 px-1.5 md:px-2 lg:px-2.5 py-px md:py-0.5  w-fit text-[9px] md:text-[8.5px] lg:text-[11px]  tracking-wide opacity-90 font-bold">
                                        <FaCircleInfo /> {banner.highlight_text}
                                    </div>
                                )}
                                {banner?.episodes && <span className='  flex lg:gap-2 gap-1 lg:pr-2 pr-1 border-r items-center border-l lg:pl-2 pl-1'> <MdPermMedia className='text-white' /> {banner.episodes} Episodes</span>}
                                <span className='  flex lg:gap-2 gap-1  items-center'> <PiStarFourBold className='text-yellow-400' /> Featured Program </span>
                            </div>
                        </>
                    )
                    }


                    <p className="text-[10.5px] md:text-[12px] lg:text-[14.3px] leading-relaxed max-w-xl font-regular tracking-normal text-justify lg:line-clamp-6 md:line-clamp-6 line-clamp-5 text-white/90">
                        {banner?.description}
                    </p>

                    <Link href={[3, 4].includes(banner.type) ? `/program/${banner.code}` : banner.url ?? "#"} className="mt-2 w-fit flex items-center gap-2 cursor-pointer lg:px-4 px-3 lg:py-2 md:py-1.5 py-1 rounded  border bg-white/10 hover:scale-105 transition text-[12px] font-semibold md:text-sm text-[#ffffff]">
                        {banner?.type && [3, 4].includes(banner?.type) ? (
                            <>
                                <BsCollectionPlayFill /> View Episodes
                            </>
                        ) : (
                            <>
                                <MdPageview /> Browse Now
                            </>
                        )}
                    </Link>
                </div>
                <div className="hidden lg:flex items-center justify-end lg:col-span-3  lg:pb-15 md:pb-10 fade-left">
                    {banner?.type && [2, 3].includes(banner?.type) && (
                        <Image
                            src={`/storage/images/banners/${banner?.media}`}
                            alt={banner?.title ?? ""}
                            width={900}
                            height={500}
                            sizes="(max-width: 768px) 100vw, 768px"
                            className="aspect-12/5 w-auto h-auto max-h-96 max-w-3xl overflow-hidden rounded-lg object-cover shadow-sm lg:shadow-md shadow-[#00aeef]  "
                        />

                    )}
                </div>
            </div>
        </div>
    )
}
