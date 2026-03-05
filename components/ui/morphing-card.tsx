"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import PostPreview from "./post-preview";
interface MorphingCardProps {
    id: number;
    title: string;
    date_published: string;
    slug: string;
    program: string;
    excerpt: string;
    thumbnail: string;
    trailer?: string | null;
    banner?: string | null;
    guest?: string | null;
    className?: string;
    isExpanded?: boolean;
    onExpand?: () => void;
    onCollapse?: () => void;
    children?: React.ReactNode;
}

export function MorphingCard({ id, title, date_published, slug, program, excerpt, thumbnail, trailer, banner, guest, children, className, isExpanded = false, onExpand, onCollapse,
}: MorphingCardProps) {
    return (
        <>
            {/* BACKDROP */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-gray-100/30 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCollapse}
                    />
                )}
            </AnimatePresence>

            <motion.div
                layoutId={`card-${id}`}
                className={cn(
                    "relative w-full",
                    isExpanded
                        ? "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[96vw] max-w-350"
                        : "cursor-pointer",
                    className
                )}

                layout={!isExpanded}

                onClick={!isExpanded ? onExpand : undefined}
            >
                <motion.div
                    layoutId={`image-${id}`}
                    className={`relative `}
                >
                    {isExpanded ? (
                        <PostPreview
                            title={title}
                            date_published={date_published}
                            slug={slug}
                            program={program}
                            excerpt={excerpt}
                            thumbnail={thumbnail}
                            guest={guest}
                            banner={banner}
                            trailer={trailer}
                        />
                    ) :
                        <>
                            {children}
                        </>
                    }
                </motion.div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onCollapse?.();
                            }}
                            className="absolute top-2 right-2 p-3 rounded-full bg-white text-black backdrop-blur-sm shadow hover:bg-background z-50"
                        >
                            <X className="h-5 w-5" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
