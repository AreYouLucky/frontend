import React from 'react'
import { FaSpinner } from 'react-icons/fa'
export default function CardLoading() {
    return (
        <>
            <div className=" space-y-8 pt-5  w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-full space-y-3 animate-pulse"
                        >
                            <div className="aspect-819/1024 rounded-xl bg-white/10 flex justify-center items-center" >
                                <FaSpinner className="text-white text-2xl animate-spin" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
