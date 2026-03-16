import { Sparkles } from "lucide-react";
import SetBg from "../ui/set-bg";
export default function HeaderSection() {
    return (
        <>
            <SetBg thumbnail="/storage/images/logos/banner.jpg" />

            <section className="flex justify-center items-center flex-col h-full text-white  w-full">

                <div className="flex items-center gap-2 text-[11px] lg:text-[13px] font-semibold uppercase tracking-[0.2em]  fade-down">
                    <Sparkles className="h-4 w-4" />
                    Explore science on DOSTv
                </div>
                <h1 className="max-w-3xl text-4xl md:text-5xl font-bold leading-tight text-center fade-right">
                    What science topic sparks your curiosity today?
                </h1>

            </section>
        </>
    );
}