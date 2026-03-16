import React from 'react'
import { SearchX } from 'lucide-react'
export default function EmptyResult() {
    return (
        <div className="rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-6 py-14 text-center">
            <div className="mx-auto max-w-xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <SearchX className="h-6 w-6 text-white/70" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold">
                    No titles matched this combination
                </h3>
                <p className="mt-3 text-sm text-white/60">
                    Try removing one or two filters to widen the search and reveal more episodes.
                </p>
            </div>
        </div>
    )
}
