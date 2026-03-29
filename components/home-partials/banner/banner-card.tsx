import { BannerModel } from '@/types/models'
import BackgroundImg from '../../ui/background-image';
import BannerCardElements from './banner-card-elements';
import BackgroundVideo from '../../ui/background-video';
import ImageLoader from '@/components/ui/image-loader';
import BannerElements from './banner-elements';

function BannerCard({ banner }: { banner: BannerModel }) {
    return (
        <div className="relative w-full text-white font-montserrat overflow-hidden  leading-relaxed tracking-wide">
            {
                [4, 6, 5].includes(banner?.type) ? (
                    <>
                        <div className='md:block hidden'>
                            <BackgroundVideo videoSrc={`/storage/videos/banners/${banner?.media}`} className="h-90 md:h-120 lg:h-180" poster={`/storage/images/banners/bgs/${banner?.bg}`}>
                                {banner?.type !== 5 ? (
                                    <div className=''>
                                        <BannerCardElements banner={banner} />
                                    </div>
                                ) : <div className='h-90 md:h-120 lg:h-180'></div>}
                            </BackgroundVideo>
                        </div>
                        <div className='mt-16 px-3 md:hidden block relative'>
                            <video
                                src={`/storage/videos/banners/${banner?.media}`}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="rounded-lg object-cover w-full h-full border border-white/40"
                                style={{ pointerEvents: "none" }}
                            />
                            <div className=''>
                                <BannerElements banner={banner} />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='md:block hidden'>
                            <BackgroundImg
                                imageSrc={
                                    banner?.bg ? `/storage/images/banners/bgs/${banner?.bg}` : `/storage/images/banners/${banner?.media}`}
                                fallbackSrc={`/storage/images/banners/${banner?.media}`}
                                className="h-90 md:h-120 lg:h-180">
                                {banner?.type !== 1 ? (
                                    <div>
                                        <BannerCardElements banner={banner} />
                                    </div>
                                ) : <div className=' h-90 md:h-120 lg:h-180'></div>}
                            </BackgroundImg>
                        </div>
                        <div className='mt-16 px-3 md:hidden block relative'>
                            <ImageLoader
                                src={banner?.media ? `/storage/images/banners/${banner?.media}` : `/storage/images/banners/bgs/${banner?.bg}`}
                                width={800}
                                height={600}
                                alt={banner.title ?? ""}
                                className="w-full h-full object-cover rounded-lg border border-white/40"
                            />
                            <div className=''>
                                <BannerElements banner={banner} />
                            </div>
                        </div>
                    </>
                )
            }

        </div>
    );
}


export default BannerCard