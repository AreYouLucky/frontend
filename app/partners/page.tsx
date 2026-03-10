import React from 'react'
import { getPartners } from '@/hooks/partner/partner-hooks'
import { LogoCloudCarousel } from '@/components/ui/logo-carousel';
import PartnersList from '@/components/partners-partials/partners-list';
export default async function PartnersPage() {
    const partners = (await getPartners()) ?? [];
    return (
        <div className='lg:pt-22 md:pt-18 pt-16 flex flex-col justify-center'>
            <div className=''>
                <h2 className=" lg:text-[22px] md:text-[18px] text-[16px] font-bold tracking-widest text-white uppercase border-white/70 px-4 text-center">
                    Partners
                </h2>
                <LogoCloudCarousel logos={partners} />
            </div>
            <div className=' lg:px-10 md:px-5 px-2'>
                <PartnersList partners={partners} />
            </div>
        </div>
    )
}
