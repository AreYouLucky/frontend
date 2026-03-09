"use client";

import { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import { AdvertisementModel } from "@/types/models";

export default function AdsCard({ ads }: { ads: AdvertisementModel[] }) {
  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  return (
    <div ref={emblaRef} className="w-full overflow-hidden">
      <div className="flex">
        {ads.map((ad) => (
          <div
            key={ad.advertisement_id ?? ad.thumbnail}
            className="flex-[0_0_100%]"
          >
            <Link
              href={ad.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative  ">

                {/* Image */}
                <div className="relative aspect-video">
                  <Image
                    src={`/storage/images/advertisements/${ad.thumbnail}`}
                    alt={ad.title ?? "Advertisement"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 400px"
                  />
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  {ad.title && (
                    <p className="text-xs md:text-sm font-semibold leading-tight line-clamp-2">
                      {ad.title}
                    </p>
                  )}

                  <span className="text-[10px] opacity-80">
                    Sponsored
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}