import { BannerModel } from '@/types/models'
import Image from 'next/image';
import BannerElements from './banner-elements';

export default function BannerCardElements({ banner }: { banner: BannerModel }) {
    return (
        <div className='w-full bg-linear-to-b from-transparent via-transparent to-zinc-900 md:via-90% via-70% to-100%'>
            <div className="grid h-90 md:h-120 lg:h-180 w-full grid-cols-1 lg:grid-cols-5 md:gap-4 lg:gap-8 gap-3 md:p-6 p-4 lg:p-12 bg-linear-to-l lg:from-black/10 md:from-black/40 from-black/60 to-black/90 ">
                <BannerElements banner={banner} />
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
