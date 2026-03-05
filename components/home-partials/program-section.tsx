"use client";
import { useState } from 'react';
import { MorphingCard } from '@/components/ui/morphing-card'
import ImageLoader from '@/components/ui/image-loader'
import { convertLongDate, convertShortDate } from '@/lib/utils'
import ProgramCard from '../ui/program-card';
import { useGetFeaturedPrograms } from '@/hooks/home/home-mount';
import { LayoutGroup } from 'framer-motion';
export default function ProgramSection({ className }: { className: string }) {
    const { data: programs } = useGetFeaturedPrograms();
    const [expandedId, setExpandedId] = useState<number | null>(null);
    return (
        <div className={`flex flex-col  rounded-md  w-full  md:px-5  ${className}`}>
            <LayoutGroup>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {programs?.map((program) => (
                        <ProgramCard
                            key={program.program_id}
                            title={program.title ?? ""}
                            description={program.description ?? ""}
                            image={program.image ?? ""}
                            video={program.trailer ?? ""}
                            slug={program.code ?? ""}
                        />


                    ))}
                </div>
            </LayoutGroup>
        </div>
    )
}
