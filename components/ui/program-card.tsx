"use client"
import { FaEye } from "react-icons/fa6"
import Link from "next/link"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ImageLoader from "./image-loader"

type Props = {
  title: string
  description: string
  image: string
  video?: string
  slug?: string
}

export default function ProgramCard({ title, description, image, video, slug }: Props) {
  const [open, setOpen] = useState(false)
  const timer = useRef<NodeJS.Timeout | null>(null)

  const handleEnter = () => {
    timer.current = setTimeout(() => {
      setOpen(true)
    }, 800)
  }

  const handleLeave = () => {
    if (timer.current) clearTimeout(timer.current)
    setOpen(false)
  }

  return (
    <div
      className="relative w-full shrink-0 "
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className=" aspect-video  hover:scale-y-105 duration-300">
        <ImageLoader
          src={`/storage/images/program_images/thumbnails/${image}`}
          alt={title}
          width={819}
          height={1024}
          className="w-full h-full object-cover rounded-lg border border-white/20"
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1.35, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute left-1/2 top-0 z-50 w-full -translate-x-1/2 overflow-hidden rounded-md bg-zinc-900 shadow-xl p-1 border border-white/60 shadow-white/20"
          >
            {video ? (
              <video
                src={`/storage/videos/program_videos/trailer/${video}`}
                autoPlay
                muted
                loop
                className="h-40 w-full object-cover"
              />
            ) : (
              <ImageLoader
                src={`/storage/images/program_images/thumbnails/${image}`}
                alt={title}
                width={380}
                height={200}
                className="object-cover"
              />
            )}

            <div className="px-4 pt-2 pb-4">
              <h3 className="text-[16px] font-semibold text-white relative">{title}</h3>
              <div
                className="mt-2 text-[10px] text-justify text-gray-200 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: description ?? "",
                }}
              />
              {/* Controls */}
              <div className=" flex gap-2">
                <div className="pt-2">
                  <Link
                    href={`/post/${slug}`}
                    className=" bg-white text-gray-900 hover:bg-gray-200 transition rounded-md px-5 py-2 flex items-center gap-2 w-fit font-bold text-xs shadow-lg hover:scale-105 duration-300 ">
                    <FaEye className="text-xs" />
                    View Episodes
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}