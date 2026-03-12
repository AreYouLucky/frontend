import React from 'react'
import { getPartners } from '@/hooks/partner/partner-hooks'
import PartnersList from '@/components/partners-partials/partners-list';
export default async function PartnersPage() {
    const partners = (await getPartners()) ?? [];

    return (
        <div className='overflow-hidden bg-[#050505]/50 text-white'>

            <section className='relative isolate lg:pt-24 md:pt-20 pt-16 '>

                <div className='relative mx-auto grid w-full gap-10 px-8 pb-12 md:px-15 lg:grid-cols-[1.15fr_0.85fr] lg:pt-12 lg:pb-30 '>
                    <div className='fade-up'>
                        <h1 className='mt-5 max-w-4xl text-4xl font-black  lg:text-5xl md:text-4xl'>
                            Partner with DOSTv
                            <span className='block text-[#00aeef] uppercase lg:text-[40px] md:text-[25px]'>
                                Bring credible science to more people
                            </span>
                        </h1>

                        <p className='mt-6 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base md:leading-8 text-justify'>
                            DOSTv collaborates with institutions, agencies, and organizations that help science stories travel further. Through meaningful partnerships, we highlight groundbreaking research, innovations, and programs that shape the future. Together, we make science more accessible, engaging, and impactful for communities across the Philippines.
                        </p>

                        <div className='mt-8 flex flex-wrap gap-3 text-sm'>
                            <a
                                href='#partners-grid'
                                className='rounded-xl bg-[#004e95] px-5 py-3 font-semibold text-white transition hover:bg-zinc-950'
                            >
                                Browse partners
                            </a>
                            <div className='rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-zinc-200'>
                                {partners.length} active collaborators
                            </div>
                        </div>
                    </div>
                    <div className='fade-left'>
                        {/* <Image
                                src="/storage/images/logos/dostv.png"
                                alt="DOSTV Logo"
                                width={600} height={600}
                                className="h-auto w-full "
                                priority
                            /> */}
                        <div className='w-full h-full rounded-lg bg-white/50 flex justify-center items-center font-bold text-3xl'>
                            Banner image with partners
                        </div>
                    </div>

                </div>
            </section>
            <div className="lg:px-8 md:px-5 px-5">
                <div className="border-b border-white/40"></div>
            </div>

            <section id='partners-grid' className='mx-auto w-full  px-8 md:px-15 py-8 md:py-15 z-10 fade-right'>
                <div className='mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between'>
                    <div>
                        <h2 className='mt-2 text-2xl font-black md:text-3xl px-4 border-l-2 border-white/40 text-white/80 relative'>
                            Partners
                        </h2>
                    </div>
                </div>

                <PartnersList partners={partners} />
            </section>
        </div>
    )
}
