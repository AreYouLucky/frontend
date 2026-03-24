"use client"

import { useKeenSlider } from "keen-slider/react"
import { useState } from "react"

export default function HorizontalSlider({
    children,
    disabled = false,
}: {
    children: React.ReactNode
    disabled?: boolean
}) {
    const [loaded, setLoaded] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        mode: "snap",
        rubberband: true,
        loop: true,
        drag: !disabled,
        slides: {
            perView: 3,
            spacing: 5,
            origin: "auto",
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },


        breakpoints: {
            "(min-width: 768px)": {
                slides: {
                    perView: 5,
                    spacing: 10,
                },
            },
            "(min-width: 1024px)": {
                slides: {
                    perView: 7,
                    spacing: 15,
                },
            },
        },

        created() {
            setLoaded(true)
        },
    })

    return (
        <div className="relative w-full z-10 lg:px-15 md:px-6 px-0">

            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-black/70 to-transparent" />

            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-black/70 to-transparent" />

            {/* PREVIOUS */}
            {loaded  && currentSlide > 0 && (
                <button
                    onClick={() => instanceRef.current?.prev()}
                    className="h-full w-8 absolute left-2 top-1/2 -translate-y-1/2 z-50  text-white md:w-12  text-4xl"
                >
                    ‹
                </button>
            )}

            {/* NEXT */}
            {loaded  && (
                <button
                    onClick={() => instanceRef.current?.next()}
                    className="h-full absolute right-2 top-1/2 -translate-y-1/2 z-50   text-white md:w-12  text-4xl"
                >
                    ›
                </button>
            )}

            {/* SLIDER */}
            <div ref={sliderRef} className="keen-slider px-4 overflow-visible">
                {children}
            </div>
        </div>
    )
}