import React from 'react'

type PartnersCtaProps = {
    totalPartners: number;
    spotlightLabel: string | null;
}

export default function PartnersCta({ totalPartners, spotlightLabel }: PartnersCtaProps) {
    return (
        <section className="relative w-full overflow-hidden border-y border-white/10 bg-black py-14 text-white md:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(229,9,20,0.22),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.95),rgba(17,17,17,0.9),rgba(0,0,0,0.95))]" />

            <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ff6b72]">
                        Ready for the next collaboration
                    </p>
                    <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                        Partner with DOSTv and show up where credible science content gets seen.
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
                        {spotlightLabel
                            ? `${spotlightLabel} is one of ${totalPartners} collaborators helping extend DOSTv's reach.`
                            : `Join a growing roster of ${totalPartners} collaborators supporting wider access to science, technology, and innovation stories.`}
                    </p>
                </div>

                <div className="grid gap-3 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur md:min-w-70">
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                            Why this matters
                        </p>
                        <p className="mt-2 text-sm leading-6 text-zinc-200">
                            Better partnerships mean wider public access, stronger distribution, and more visible science communication.
                        </p>
                    </div>

                    <a
                        href="#partners-grid"
                        className="inline-flex items-center justify-center rounded-full bg-[#e50914] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#f6121d]"
                    >
                        Explore the roster
                    </a>
                </div>
            </div>
        </section>
    )
}
