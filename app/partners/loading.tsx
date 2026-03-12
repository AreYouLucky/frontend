import React from 'react'
import { FaSpinner } from 'react-icons/fa'
export default function PartnerLoading() {
  return (
    <div className=" space-y-8  w-full lg:pt-20 md:pt-16 pt-20 lg:px-10 md:px-5 px-2 py-6">
      <div className='w-full grid md:grid-cols-2 gap-5 md:h-70 lg:h-130 px-8 mb:pb-12 md:px-15'>
        <div className='flex justify-center flex-col gap-2'>
          <div className='py-4 w-full max-w-130 bg-white/20 rounded-xl'/>
          <div className='py-4 w-full max-w-120 bg-white/20 rounded-xl'/>
          <div className='py-1 w-full max-w-140 bg-white/20 rounded-xl mt-2'/>
          <div className='py-1 w-full max-w-140 bg-white/20 rounded-xl'/>
          <div className='py-1 w-full max-w-140 bg-white/20 rounded-xl'/>
          <div className='py-1 w-full max-w-140 bg-white/20 rounded-xl'/>
          <div className='py-1 w-full max-w-140 bg-white/20 rounded-xl'/>
          <div className='grid grid-cols-2 gap-2 w-full max-w-100 mt-3'>
            <div className='py-5 rounded-xl w-full bg-white/20'/>
            <div className='py-5 rounded-xl w-full bg-white/20'/>
          </div>
        </div>
        <div className=' flex justify-center items-center'>
          <div className="w-full bg-white/20 animate-pulse aspect-12/6 flex items-center justify-center mb-5 rounded-xl">
            <FaSpinner className="text-white text-4xl animate-spin" />
          </div>
        </div>
      </div>
      <div className="lg:px-8 md:px-5 px-5">
        <div className="border-b border-white/40"></div>
      </div>

      <div className='w-100 py-3 bg-white/10 animate-pulse'>
      </div>
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
              <div className='py-4 px-15  w-fit rounded-xl bg-white/20 mb-5' />
              <div className='py-1 rounded-xl bg-white/20 mb-1' />
              <div className='py-1 rounded-xl bg-white/20 mb-1' />
              <div className='py-1 rounded-xl bg-white/20 mb-1' />
              <div className='py-1 rounded-xl bg-white/20 mb-1' />
              <div className='py-1 rounded-xl bg-white/20 mb-1' />
              <div className='py-1 rounded-xl bg-white/20 mb-1' />
              <div className='py-1 rounded-xl bg-white/20 mb-1' />

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
