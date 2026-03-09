    import React from 'react'
    import { ProgramsModel } from '@/types/models'
    import ImageLoader from '@/components/ui/image-loader'
    import { Calendar1Icon, VideoIcon } from 'lucide-react';
    import { convertLongDate } from '@/lib/utils';

    export default function ProgramCard({program, total}: {program:ProgramsModel,total:number}) {
        return (
            <>
                <ImageLoader
                    src={`/storage/images/program_images/thumbnails/${program.image}`}
                    width={800}
                    height={600}
                    alt={program.title}
                    className="w-full h-full object-cover rounded-lg border border-white/40"
                />
                <h1 className='text-2xl md:text-4xl font-bold leading-snug text-white uppercase md:py-4 py-2'>
                    {program.title}
                </h1>
                <div className='flex items-center'>
                    <div className='border-r pr-4 border-white/40'>
                        <h3 className='text-sm text-gray-50 flex items-center gap-2 font-semibold'><Calendar1Icon />{convertLongDate(program.date_started ?? "")}</h3>
                    </div>
                    <div className='pl-4 text-white'>
                        <h3 className='text-sm text-gray-50 flex items-center gap-2 font-semibold '><VideoIcon />{total} Episodes</h3>
                    </div>
                </div>
                <div
                    className=" text-justify md:text-[15px] text-[13px] bg-transparent mt-2 text-white/90  font-montserrat tracking-wide "
                    dangerouslySetInnerHTML={{
                        __html: program?.description ?? "",
                    }}
                />
            </>
        )
    }
