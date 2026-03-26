'use client'
import TopYouTubeExpanding from "./top-yt";
import PageLoading from "@/components/ui/page-loading";
import { useGetYtList } from "@/hooks/home/home-mount";
function YoutubeList() {
    const { data, isFetching } = useGetYtList();

    if (isFetching) {
        return (
            <div className="w-full mb-4 block py-4 md:py-6 lg:py-8 lg:px-6 overflow-hidden bg-white/10 ">
                <PageLoading/>
            </div>
        )
    }

    return (
        <div className="w-full mb-4 block py-4 md:py-6 lg:py-8 overflow-hidden border-y border-white/50 ">

            <div className="flex items-center justify-between gap-4 px-3">
                <div className="flex items-center gap-2 border-l border-white/30 pl-1.5 md:pl-6">
                    <h3 className="lg:text-[20px] md:text-[15px] text-[13px] text-white font-bold uppercase">
                        Top 10 YouTube Videos
                    </h3>
                </div>

                <span className="px-3 py-1 rounded-lg border text-[13px] font-bold tracking-wide text-slate-50 uppercase ">
                    2026
                </span>
            </div>
            <div className="w-full  rounded-xl py-2 lg:px-4 md:px-6 px-2">
                <div className="w-full min-w-0">
                    {data &&
                        <TopYouTubeExpanding data={data} />
                    }
                </div>
            </div>

        </div>
    )
}

export default YoutubeList