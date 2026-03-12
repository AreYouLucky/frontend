"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { trimText } from "@/lib/utils";

export interface CardType {
    title: string;
    description: string;
    image: string;
    href?: string;
    videoId?: string;
    view_count: string;
}

export interface Breakpoint {
    maxWidth: number;
    activeWidth: number;
    inactiveWidth: number;
    titleActive: string;
    titleInactive: string;
}

export interface ExpandingCardsProps {
    cards: CardType[];
    breakpoints?: Breakpoint[];
    gap?: string;
    height?: string;
    prevIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
    classNames?: {
        container?: string;
        card?: string;
        image?: string;
        overlay?: string;
        title?: string;
        description?: string;
        button?: string;
        buttonIcon?: string;
    };
    transitionDuration?: number;
}

const DEFAULT_BREAKPOINTS: Breakpoint[] = [
    {
        maxWidth: 640,
        activeWidth: 200,
        inactiveWidth: 200,
        titleActive: "18px",
        titleInactive: "12px",
    },
    {
        maxWidth: 1024,
        activeWidth: 300,
        inactiveWidth: 300,
        titleActive: "22px",
        titleInactive: "14px",
    },
];

export function ExpandingCards({
    cards,
    breakpoints = DEFAULT_BREAKPOINTS,
    gap = "gap-0 md:gap-2",
    height = "h-[300px] md:h-[350px] lg:h-[400px]",
    prevIcon,
    nextIcon,
    classNames,
    transitionDuration = 0.35,
}: ExpandingCardsProps) {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [windowWidth, setWindowWidth] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    /* ---------- resize ---------- */
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /* ---------- responsive sizes ---------- */
    const { activeWidth, inactiveWidth } =
        useMemo(() => {
            const sorted = [...breakpoints].sort(
                (a, b) => a.maxWidth - b.maxWidth
            );

            let settings = {
                activeWidth: 380,
                inactiveWidth: 180,
                titleActive: "24px",
                titleInactive: "16px",
            };

            for (const bp of sorted) {
                if (windowWidth <= bp.maxWidth) {
                    settings = bp;
                    break;
                }
            }

            return settings;
        }, [windowWidth, breakpoints]);

    /* ---------- navigation ---------- */
    const handleCardClick = (index: number) => setActiveIndex(index);
    const handlePrev = () => setActiveIndex((p) => Math.max(0, p - 1));
    const handleNext = () =>
        setActiveIndex((p) => Math.min(cards.length - 1, p + 1));

    /* ---------- auto center active ---------- */
    useEffect(() => {
        const container = containerRef.current;
        const card = cardRefs.current[activeIndex];
        if (!container || !card) return;

        const containerRect = container.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        const offset =
            cardRect.left -
            containerRect.left -
            containerRect.width / 2 +
            cardRect.width / 2;

        container.scrollBy({
            left: offset,
            behavior: "smooth",
        });
    }, [activeIndex]);


    return (
        <div className="relative w-full">
            <div
                ref={containerRef}
                className={`flex overflow-x-auto snap-x snap-mandatory w-full ${gap} ${height} [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${classNames?.container || ""
                    }`}
            >
                {cards.map((card, index) => {
                    const isActive = activeIndex === index;

                    return (
                        <motion.div
                            key={`${card.title}-${index}`}
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                            className={`relative rounded-lg overflow-hidden cursor-pointer shrink-0 snap-start border border-white/10 ${classNames?.card || ""
                                }`}
                            animate={{
                                width: isActive ? activeWidth : inactiveWidth,
                                scale: isActive ? 1 : 0.90,
                            }}
                            transition={{
                                duration: transitionDuration,
                                ease: "easeOut",
                            }}
                            onClick={() => handleCardClick(index)}
                        >
                            {/* IMAGE */}
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                sizes="(max-width: 760px) 70vw, 400px"
                                className={`object-cover ${classNames?.image || ""}`}
                                unoptimized
                            />

                            {/* GRADIENT */}
                            <div
                                className={`absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/70 ${classNames?.overlay || ""
                                    }`}
                            />

                            {/* CONTENT WRAPPER */}
                            <div className="absolute inset-0 flex flex-col justify-end text-white">
                                {/* ACTIVE CONTENT */}
                                <motion.div
                                    animate={{
                                        opacity: isActive ? 1 : 0,
                                        y: isActive ? 0 : 20,
                                    }}
                                    style={{
                                        pointerEvents: isActive ? "auto" : "none",
                                    }}
                                    className={`relative px-2 rounded-xl min-w-0 ${classNames?.card || ""}`}
                                >

                                    <Link
                                        href={`https://www.youtube.com/watch?v=${card.videoId}`}
                                        target="_blank"
                                        className="flex flex-row gap-3 fade-up bg-black/60 rounded-lg lg:py-3 py-2 px-2 lg:px-4 items-center md:mb-2 hover:bg-black transition border border-[#00aeef]/40"
                                    >
                                        <div className="text-center flex flex-col justify-center gap-1 items-center">
                                            <span className="lg:text-[70px] md:text-[50px] text-[30px]
                                                [-webkit-text-stroke:1px_white] font-extrabold text-zinc-900/60 px-2 w-fit h-fit">
                                                #{index + 1}
                                            </span>
                                        </div>

                                        <div className="flex flex-col flex-1 items-center justify-center min-w-0 h-full md:pt-2 lg:pt-0">
                                            <div className="grid">
                                                <h3 className="text-[11px] lg:text-[14px] md:text-[13px] font-bold text-white  mb-1">
                                                    {card.title}
                                                </h3>

                                                <p className="hidden lg:block lg:text-[12.5px] text-[11px] text-slate-300 tracking-tight text-justify whitespace-pre-wrap line-clamp-3 md:line-clamp-4">
                                                    {trimText(card.description, 120)}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>

                                {/* INACTIVE TITLE STRIP */}
                                <motion.div
                                    animate={{
                                        opacity: isActive ? 0 : 1,
                                    }}
                                    className="absolute bottom-0 left-0 right-0 bg-black/40 px-3 py-2"
                                >
                                    <div className=" text-center flex flex-col justify-center gap-1 items-center">
                                        <span className="lg:text-[60px] md:text-[40px] text-[20px] 
                                                [-webkit-text-stroke:1px_white] font-extrabold text-zinc-900/60 px-2 py-1 w-fit h-fit">
                                            #{index + 1}
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ================= ARROWS ================= */}

            {/* LEFT ARROW */}
            <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/90 hover:bg-white/50 rounded-full p-2 transition ${activeIndex === 0 ? "opacity-0" : "opacity-100"} ${classNames?.button || ""}`}
            >
                {prevIcon || (
                    <ChevronLeft
                        className={`w-5 h-5 md:w-6 md:h-6 text-gray-50 ${classNames?.buttonIcon || ""}`}
                    />
                )}
            </button>

            {/* RIGHT ARROW */}
            <button
                onClick={handleNext}
                disabled={activeIndex === cards.length - 1}
                className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/90 hover:bg-white/50 rounded-full p-2 transition ${activeIndex === cards.length - 1 ? "opacity-0" : "opacity-100"} ${classNames?.button || ""}`}
            >
                {nextIcon || (
                    <ChevronRight
                        className={`w-5 h-5 md:w-6 md:h-6 text-gray-50 ${classNames?.buttonIcon || ""}`}
                    />
                )}
            </button>


        </div>
    );
}
