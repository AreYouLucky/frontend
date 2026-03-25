import { getPartners } from '@/hooks/partner/partner-hooks'
import PartnersList from '@/components/partners-partials/partners-list';
import { Metadata } from "next";
import Image from 'next/image';

const baseURL = process.env.NEXT_PUBLIC_URL;
export const metadata: Metadata = {
    metadataBase: new URL(`${baseURL}`),
    title: "DOSTv Partners | Collaborating for Science Communication",
    description:
        "Discover the organizations, institutions, and agencies partnering with DOSTv to bring science, technology, and innovation stories closer to Filipinos nationwide.",
    keywords: [
        "DOSTv partners",
        "DOST Philippines partners",
        "science collaboration Philippines",
        "science communication partners",
        "DOST science programs partners",
        "Philippine science organizations",
        "DOSTv collaborators",
        "science and technology partnerships Philippines",
    ],

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    openGraph: {
        title: "DOSTv Partners",
        description:
            "Explore the institutions and organizations collaborating with DOSTv to expand science communication and innovation awareness across the Philippines.",
        url: `${baseURL}/partners`,
        siteName: "DOSTv",
        images: [
            {
                url: `${baseURL}/storage/images/partners/cta.png`,
                width: 1200,
                height: 630,
                alt: "DOSTv Partners",
            },
        ],
        locale: "en_PH",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "DOSTv Partners",
        description:
            "Meet the organizations working with DOSTv to promote science, technology, and innovation in the Philippines.",
        images: [`${baseURL}/storage/images/partners/cta.png`],
    },

    icons: {
        icon: `${baseURL}/storage/images/logos/logo.png`,
    },
};

export default async function PartnersPage() {
    const partners = (await getPartners()) ?? [];

    return (
        <div className='overflow-hidden bg-[#050505]/50 text-white'>

            <section className='relative isolate lg:pt-24 md:pt-20 pt-20 '>

                <div className='relative mx-auto flex flex-col-reverse lg:flex-row items-center w-full md:gap-10 px-8 pb-12 md:px-15 lg:pt-12 lg:pb-30 '>
                    <div className='fade-up w-full'>
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
                    <div className='fade-left md:w-300'>
                        <Image
                              src="/storage/images/partners/cta.png"
                                alt="DOSTV Logo"
                                width={600} height={600}
                                className="h-auto w-full rounded-lg"
                                priority
                            />
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
