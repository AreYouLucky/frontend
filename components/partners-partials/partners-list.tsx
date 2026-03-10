import React from 'react'
import { Partner } from '@/types/models';
import ImageLoader from '../ui/image-loader';
export default function PartnersList({ partners }: { partners: Partner[] }) {
    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-6'>
            {partners.map((partner) => (
                <div key={partner.partner_id} className="grid grid-cols-3 gap-4 text-white border border-white/40 p-4 rounded-lg">
                    <div className='flex flex-col justify-center items-center rounded-xl bg-white overflow-hidden p-2'>
                        <ImageLoader src={`/storage/images/partners/${partner.featured_image ?? ""}`} alt={partner.label ?? ""} className="w-full h-full object-contain relative" />
                    </div>
                    <div className='col-span-2 flex flex-col gap-2 justify-center p-4'>
                        <h2 className='font-bold text-[17px]'>
                            {partner.label}
                        </h2>
                        <p className='text-[14px] text-justify'>
                            {partner.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}


