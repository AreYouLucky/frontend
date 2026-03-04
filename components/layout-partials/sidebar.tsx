
import {
    Home,
    Video,
    MicVocal, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PrefetchLink from "./prefetch-link";
import { ProgramsModel } from "@/types/models";
import SidebarCollapseGroup from "./collapseable-links";
import { usePathname } from "next/navigation";
import Socials from "./socials";
import { Activity } from "react";

type SidebarProps = {
    open: boolean;
    collapsed: boolean;
    onClose: () => void;
    onToggleCollapse: () => void;
    programs: ProgramsModel[];
};



export default function Sidebar({
    open,
    collapsed,
    onClose,
    programs,
}: SidebarProps) {

    const path = usePathname();
    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black opacity-50"
                    onClick={onClose}
                />
            )}

            <aside
                className={cn(
                    "fixed z-50 font-inter min-h-screen max-h-screen flex flex-col overflow-hidden border-r border-gray-50/10",
                    "lg:bg-gray-900/80 bg-black text-white transition-all duration-300",
                    "w-60  lg:w-58",
                    open ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <div className="flex items-center justify-between  px-5 py-4 md:py-6 border-b border-gray-50/10">
                    <div className="font-semibold">
                        <Image
                            src="/storage/images/logos/dostv.png"
                            alt="DOSTV Logo"
                            width={140}
                            height={120}
                            priority
                            className="h-auto w-32"
                        />
                    </div>
                </div>
                <nav className="flex flex-col gap-3 px-4 py-6 flex-1 overflow-y-auto scroll-slim">
                    <PrefetchLink
                        href="/"
                        className={cn(
                            "text-[14px] font-semibold flex items-center gap-3 rounded px-2 py-2 hover:scale-105 duration-300",
                            collapsed && "justify-start", path == '/home' ? " text-white " : "text-gray-200",
                        )}
                    >
                        <Home className={`h-5 w-5 shrink-0 font-bold ${path == '/home' && " text-white"}`} />
                        <span>Home</span>
                    </PrefetchLink>
                    <div className="space-y-1">
                        <Activity>
                            <SidebarCollapseGroup label="Programs" icon={<Video className="h-5 w-5 shrink-0" />}
                                items={programs?.filter(program => program.program_type === "Video")}
                            />
                        </Activity>
                    </div>


                    <div className="space-y-1 mt-2">

                        <p className="px-1 text-[11px] font-semibold uppercase text-white/40">
                            Info
                        </p>
                        <PrefetchLink
                            href="/about"
                            className={cn(
                                "text-[14px] font-semibold flex items-center gap-3 rounded px-2 py-2 hover:scale-105 duration-300",
                                collapsed && "justify-start", path == '/about' ? " text-white" : "text-gray-400"
                            )}
                        >
                            <Info className={`h-5 w-5 shrink-0 font-bold ${path == '/about' && " text-[#00aeef]"}`} />
                            <span>About</span>
                        </PrefetchLink>
                        <PrefetchLink
                            href="/testimonials"
                            className={cn(
                                "text-[14px] font-semibold flex items-center gap-3 rounded px-2 py-2 hover:scale-105 duration-300",
                                collapsed && "justify-start", path == '/testimonials' ? " text-white" : "text-gray-400"
                            )}
                        >
                            <MicVocal className={`h-5 w-5 shrink-0 font-bold ${path == '/testimonials' && " text-[#00aeef]"}`} />
                            <span>Testimonials</span>
                        </PrefetchLink>
                        <PrefetchLink
                            href="/partners"
                            className={cn(
                                "text-[14px] font-semibold flex items-center gap-3 rounded px-2 py-2 hover:scale-105 duration-300",
                                collapsed && "justify-start", path == '/testimonials' ? " text-white" : "text-gray-400"
                            )}
                        >
                            <MicVocal className={`h-5 w-5 shrink-0 font-bold ${path == '/testimonials' && " text-[#00aeef]"}`} />
                            <span>Partner</span>
                        </PrefetchLink>

                    </div>

                </nav>
                <div className="mt-auto  px-4 lg:px-7 w-full max-w-full overflow-hidden flex justify-center flex-col items-center">
                    <Socials className="pb-4 flex lg:hidden" />
                </div>
            </aside>
        </>
    );
}
