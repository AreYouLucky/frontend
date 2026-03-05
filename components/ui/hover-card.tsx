"use client"
import { FaPlay, FaPlus } from "react-icons/fa6"
import Link from "next/link"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ImageLoader from "./image-loader"
import { CategoriesModel } from "@/types/models"
type Props = {
  title: string
  description: string
  image: string
  video?: string
  banner?: string
  slug?: string
  categories?: CategoriesModel[]
  date: string
  program_code: string
}

export default function HoverCard({ title, description, image, banner = "", video, slug, categories, date, program_code}: Props) {
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
      <div className=" aspect-819/1024 hover:scale-y-105 duration-300">
        <ImageLoader
          src={`/storage/images/post_images/thumbnails/${image}`}
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
            {/* Video Preview */}
            {video ? (
              <video
                src={`/storage/videos/post_videos/trailers/${video}`}
                autoPlay
                muted
                loop
                className="h-40 w-full object-cover"
              />
            ) : (
              <ImageLoader
                src={banner !== "" ? `/storage/images/post_images/banners/${banner}` : `/storage/images/post_images/thumbnails/${image}`}
                alt={title}
                width={380}
                height={200}
                className="object-cover"
              />
            )}

            <span className="text-[8px] text-white/80 absolute top-0 left-0 bg-[#004a95] px-2 py-1 font-semibold rounded-br-lg">
              {date}
            </span>

            <div className="px-4 pt-2 pb-4">
              <h3 className="text-[16px] font-semibold text-white relative">{title}</h3>
              <p className="mt-2 text-[10px] text-justify text-gray-200 line-clamp-3 ">
                {description}
              </p>
              <div className="flex gap-1 mt-2 flex-wrap">
                {categories?.map((category) => (
                  <div
                    key={category.post_category_id}
                    className="text-white text-[9px] py-px px-2 border border-white/60 rounded-lg shrink-0"
                  >
                    {category.category_name}
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="mt-4 flex gap-2">
                <div className="pt-2">
                  <Link
                    href={`/post/${slug}`}
                    className=" bg-white text-gray-900 hover:bg-gray-200 transition rounded-md px-5 py-2 flex items-center gap-2 w-fit font-bold text-xs shadow-lg hover:scale-105 duration-300 ">
                    <FaPlay className="text-xs" />
                    Play
                  </Link>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/program/${program_code}`}
                    className="  border text-gray-50 hover:bg-gray-800 transition rounded-md px-5 py-2 flex items-center gap-2 w-fit font-bold text-xs shadow-lg hover:scale-105 duration-300 ">
                    <FaPlus className="text-xs" />
                    More
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