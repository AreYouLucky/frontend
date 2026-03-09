import PageLoading from "@/components/ui/page-loading"
import { FaSpinner } from "react-icons/fa"
export default function HomeLoading() {
  return (
    <div className="w-full ">
      <div className="w-full bg-white/10 p-8 animate-pulse h-68 md:h-120 lg:h-180 flex items-center justify-center">
        <FaSpinner className="text-white text-5xl animate-spin" />
      </div>
      <PageLoading/>
    </div>
  )
}
