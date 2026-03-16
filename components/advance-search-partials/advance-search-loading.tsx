import { FaSpinner } from "react-icons/fa";

export default function AdvanceSearchLoading() {
    return (
        <div className="w-full min-h-screen px-4 pt-22 md:px-8 lg:px-13 lg:pt-25">
            <section className="flex flex-col items-center justify-center gap-4 pb-8 text-white lg:pb-15">
                <div className="h-4 w-44 animate-pulse rounded-full bg-sky-300/25" />
                <div className="h-10 w-full max-w-3xl animate-pulse rounded-full bg-white/10 md:h-12" />
                <div className="h-10 w-5/6 max-w-2xl animate-pulse rounded-full bg-white/6 md:h-12" />
            </section>

            <section className="border-b border-white/20 pb-10">
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex h-14 animate-pulse items-center rounded-2xl border border-white/10 bg-white/6 px-4"
                        >
                            <div className="h-4 w-24 rounded-full bg-white/10" />
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <div className="h-9 w-[8.5rem] animate-pulse rounded-full bg-[#004a95]/45" />
                    <div className="h-9 w-24 animate-pulse rounded-full bg-white/8" />
                    <div className="h-9 w-28 animate-pulse rounded-full bg-white/8" />
                    <div className="h-9 w-32 animate-pulse rounded-full bg-white/8" />
                </div>
            </section>

            <section className="w-full pb-16 pt-5 text-white">
                <div className="space-y-5">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div className="space-y-2">
                            <div className="h-8 w-72 animate-pulse rounded-full bg-white/10" />
                            <div className="h-4 w-96 max-w-full animate-pulse rounded-full bg-white/6" />
                        </div>
                        <div className="flex h-10 w-32 items-center justify-center rounded-full border border-white/10 bg-white/8">
                            <FaSpinner className="text-base text-white/70 animate-spin" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div key={index} className="space-y-3 animate-pulse">
                                <div className="aspect-819/1024 rounded-xl bg-white/10 flex items-center justify-center">
                                    <FaSpinner className="text-2xl text-white/70 animate-spin" />
                                </div>
                                <div className="h-4 w-11/12 rounded-full bg-white/10" />
                                <div className="h-3 w-8/12 rounded-full bg-white/6" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
