import PageLoading from "@/components/ui/page-loading";
import { FaSpinner } from "react-icons/fa";

export default function AboutLoading() {
  return (
    <div className="relative lg:pt-20 md:pt-18 pt-16">
      <div className="relative w-full aspect-video bg-white/10 animate-pulse flex items-center justify-center">
        <FaSpinner className="text-white text-4xl animate-spin" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#050505] to-transparent md:h-48" />
      </div>
      <section className="relative z-10 mx-auto -mt-16 w-full pb-10 md:-mt-24 md:pb-14">
        <div className="overflow-hidden border-y border-white/10 bg-zinc-950/80 backdrop-blur shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          <div className="h-1 w-full bg-linear-to-r from-transparent via-[#0931e5] to-transparent" />

          <div className="grid gap-8 p-6 md:grid-cols-[1.15fr_1fr] md:p-10 lg:p-20">
            <div className="flex flex-col gap-4 animate-pulse">
              <div className="h-6 w-40 rounded-full bg-white/10" />

              <div className="h-10 w-80 bg-white/20 rounded-lg" />
              <div className="h-10 w-96 bg-white/20 rounded-lg" />

              <div className="mt-4 space-y-2">
                <div className="h-3 w-full bg-white/10 rounded" />
                <div className="h-3 w-11/12 bg-white/10 rounded" />
                <div className="h-3 w-10/12 bg-white/10 rounded" />
                <div className="h-3 w-9/12 bg-white/10 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-zinc-900/70 p-4 animate-pulse"
                >
                  <div className="h-8 w-16 bg-white/20 rounded mb-2" />
                  <div className="h-3 w-20 bg-white/10 rounded" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <PageLoading />
    </div>
  );
}