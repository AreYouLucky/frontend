'use client'

import { useState } from 'react'
import PrefetchLink from './prefetch-link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProgramsModel } from '@/types/models'
import { usePathname } from 'next/navigation'


type SidebarCollapseGroupProps = {
    label: string
    icon?: React.ReactNode
    items: ProgramsModel[]
}

export default function SidebarCollapseGroup({
    label,
    icon,
    items,
}: SidebarCollapseGroupProps) {
    const [open, setOpen] = useState(true)
    const path = usePathname();

    return (
        <div className="w-full">
            {/* Group Header */}
            <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className={cn(
                    "flex w-full cursor-pointer items-center gap-3 rounded px-2 py-2 text-sm transition-all duration-300 hover:scale-105",
                     open ? "text-white" : 'text-gray-400'
                )}
            >
                {icon}

                        <span className={`first-line:lex-1 text-left font-semibold text-[13px]`}>{label}</span>
                        <ChevronDown
                            className={cn(
                                "h-4 w-4 transition-transform",
                                open && "rotate-180"
                            )}
                        />

            </button>

            {/* Items */}
            <div
                className={cn(
                    "overflow-y-auto overflow-x-hidden transition-all duration-300 ",
                    open ? "max-h-auto" : "max-h-0"
                )}
            >
                <div
                    className={cn(
                        "ml-7 flex flex-col gap-1 py-0.5 max-h-100",
                        open &&  "fade-down"
                    )}
                >
                    {items?.map((item, index) => (
                        <PrefetchLink
                            key={index}
                            href={`/program/${item.code}`}
                            className={`rounded px-2 py-1 text-[13.3px]  hover:bg-gray-100 hover:text-black  duration-200 font-regular ${path === `/program/${item.code}` ? "text-white" : "text-gray-300"    }`}
                        >
                            {item.title}
                        </PrefetchLink>
                    ))}
                </div>
            </div>

        </div>
    )
}
