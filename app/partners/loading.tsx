import React from 'react'
import { FaSpinner } from 'react-icons/fa'
export default function PartnerLoading() {
  return (
    <div className=" space-y-8  w-full lg:pt-20 md:pt-16 pt-14 lg:px-10 md:px-5 px-2 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-full space-y-3 animate-pulse grid-cols-3 grid border border-white/40 bg-white/5 p-4 rounded-lg"
          >
            <div className=" rounded-xl bg-white/10 flex justify-center items-center h-50" >
              <FaSpinner className="text-white text-2xl animate-spin" />
            </div>
            <div className=' col-span-2 p-4'>
              <div className='py-4 px-15  w-fit rounded-xl bg-white/20 mb-5'/>
              <div className='py-1 rounded-xl bg-white/20 mb-1'/>
              <div className='py-1 rounded-xl bg-white/20 mb-1'/>
              <div className='py-1 rounded-xl bg-white/20 mb-1'/>
              <div className='py-1 rounded-xl bg-white/20 mb-1'/>
              <div className='py-1 rounded-xl bg-white/20 mb-1'/>
              <div className='py-1 rounded-xl bg-white/20 mb-1'/>
              <div className='py-1 rounded-xl bg-white/20 mb-1'/>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
