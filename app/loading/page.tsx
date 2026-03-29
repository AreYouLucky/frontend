import PageLoading from "@/components/ui/page-loading"
import { FaSpinner } from "react-icons/fa";
export default function ProgramLoading() {
  return (
    <div className="w-full lg:pt-22 md:pt-18 pt-16">
      <div className="flex lg:flex-row flex-col lg:px-20 md:px-5 px-3 gap-8">
        <div className="grid w-full py-2 gap-px border-0 lg:border-r border-white/40 space-y-2">
          <div className="flex justify-center items-center w-full aspect-16/7 bg-white/10 animate-pulse lg:max-w-300 rounded-lg">
            <FaSpinner className="text-white text-4xl animate-spin" />
          </div>
          <div className="py-1 animate-pulse w-100 bg-white/20 h-10 rounded-lg" />
          <div className="py-1 animate-pulse max-w-220 bg-white/20 h-2 rounded-lg" />
          <div className="py-1 animate-pulse max-w-250 bg-white/20 h-2 rounded-lg" />
          <div className="py-1 animate-pulse max-w-230 bg-white/20 h-2 rounded-lg" />

        </div>
        <div className=" md:w-120 w-60 flex flex-col gap-2  ">
          <div className="py-1 animate-pulse w-40 bg-white/20 h-5 rounded-lg" />
          <div className="w-full bg-white/10  aspect-819/1024 animate-pulse  flex items-center justify-center rounded-lg">
            <FaSpinner className="text-white text-4xl animate-spin" />
          </div>
          <div className="py-1 animate-pulse w-30 bg-white/20 h-5 rounded-lg" />
          <div className="py-1 animate-pulse max-w-230 bg-white/20 h-2 rounded-lg" />
          <div className="py-1 animate-pulse max-w-230 bg-white/20 h-2 rounded-lg" />
          <div className="py-1 animate-pulse max-w-230 bg-white/20 h-2 rounded-lg" />
          <div className="py-1 animate-pulse max-w-230 bg-white/20 h-2 rounded-lg" />
        </div>
      </div>
      <PageLoading />
    </div>
  )
}
