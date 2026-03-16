import React from 'react'
import { Clapperboard } from 'lucide-react'
export default function FilterEmpty() {
    return (
        <div className="relative overflow-hidden rounded-xl border border-white/10  px-6 py-20 text-center bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] ">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#004a92] bg-[#004a92]/40">
                    <Clapperboard className="h-6 w-6 text-[#00 4a92]" />
                </div>
                <div>
                    <p className="text-[11px] uppercase tracking-[0.38em] text-gray-200/85">
                        Start Exploring
                    </p>

                    <p className="mx-auto mt-3 max-w-xl text-sm text-white/60 md:text-base">
                        Begin your journey through DOSTv. Choose a program, topic, or year to uncover
                        inspiring stories, groundbreaking research, and innovations from Filipino scientists.
                    </p>
                </div>
            </div>
        </div>
    )
}
