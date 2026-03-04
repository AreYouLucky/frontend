"use client";

import Image from "next/image";
import { useState } from "react";
import { ImSpinner } from "react-icons/im";

interface Props {
  src: string;
  alt?: string; 
  height?: number;
  width?: number;
  className?: string;
}

export default function ImageLoader({
  src,
  alt = "image",
  height,
  width,
  className,
}: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full overflow-hidden ">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
          <ImSpinner className="text-white/80 text-xl animate-spin" />
        </div>
      )}

      <Image
        src={src}
        alt={alt} 
        title={alt}
        width={width ?? 150}
        height={height ?? 150}
        onLoad={() => setLoading(false)}
        loading="lazy"
        className={`${className ?? ""} ${
          loading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      />
    </div>
  );
}
