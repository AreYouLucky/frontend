import React from 'react'

export default function PageLoading() {
    return (
        <>
            <div className="flex flex-col justify-between lg:px-5 md:px-3 px-2">
                <div className=" lg:text-[16px] md:text-[13px] text-[11px] font-bold mb-2 tracking-wider px-3 border-l border-white/40 mt-4">
                    <div className="h-7 w-60 rounded bg-white/10" />
                </div>
            </div>
            <div className="px-4 md:px-6 lg:px-8 space-y-8 pt-5 ">
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-full space-y-3 animate-pulse"
                        >
                            <div className="aspect-819/1024 rounded-xl bg-white/10" />
                        </div>
                    ))}
                </div>
                <div className="lg:px-3 md:px-1 px-1">
                    <div className=""></div>
                </div>
            </div>
        </>
    )
}
