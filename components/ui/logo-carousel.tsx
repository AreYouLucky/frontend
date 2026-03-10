"use client";
import ImageLoader from "./image-loader";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface LogoCloudCarouselProps {
    logos: {
        label: string;
        featured_image: string;
    }[];
}

interface MarqueeRowProps {
    direction: "left" | "right";
    speed: number;
    logos: {
        label: string;
        featured_image: string;
    }[];
    className?: string;
}

export function LogoCloudCarousel({ logos }: LogoCloudCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.2 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [controls, isInView]);

    return (
        <div className="w-full py-5 overflow-hidden bg-linear-to-b from-background to-background/80">
            <div className="container" ref={containerRef}>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-background to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-background to-transparent z-10" />
                    <MarqueeRow direction="left" speed={40} logos={logos} />
                    <MarqueeRow
                        direction="right"
                        speed={40}
                        logos={logos}
                        className="mt-8"
                    />
                </div>
            </div>
        </div>
    );
}

function MarqueeRow({
    direction,
    speed,
    logos,
    className = "",
}: MarqueeRowProps) {
    const duplicatedLogos = [...logos, ...logos];
    const translateValue = "50%";

    return (
        <motion.div
            className={`flex space-x-8 ${className}`}
            initial={{ x: direction === "left" ? 0 : `-${translateValue}` }}
            animate={{ x: direction === "left" ? `-${translateValue}` : 0 }}
            transition={{
                repeat: Infinity,
                duration: speed,
                ease: "linear",
            }}
        >
            {duplicatedLogos.map((logo, index) => (
                <motion.div
                    key={`${direction}-${index}`}
                    className="shrink-0 flex items-center justify-center h-16 w-32 rounded-xl "
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
                        borderColor: "rgba(var(--primary), 0.3)",
                    }}
                >
                    <div className="bg-white p-2 h-full flex justify-center items-center rounded-lg">
                        <ImageLoader
                            src={`/storage/images/partners/${logo.featured_image}`}
                            alt={logo.label}
                            className="max-h-12 max-w-full object-contain rounded-sm relative"
                        />
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}