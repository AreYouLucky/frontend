import React from "react";

interface VideoEmbedProps {
  url?: string;
  platform?: string;
  height?: string;
}

const LinkPlayer = ({ url = "", platform = "" }: VideoEmbedProps) => {
  if (!url || !platform) {
    return (
      <div className="w-full aspect-video flex items-center justify-center border border-dashed rounded-lg ">
        Add video information
      </div>
    );
  }

  const getEmbedUrl = () => {
    switch (platform) {
      case "YouTube":
        return `https://www.youtube.com/embed/${extractYouTubeId(url)}?enablejsapi=1&autoplay=1&rel=0&modestbranding=1&playsinline=1`;

      case "Facebook":
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
          url
        )}&show_text=false`;

      case "Tiktok":
        return `https://www.tiktok.com/embed/v2/${extractTikTokId(url)}`;

      default:
        return "";
    }
  };

  return (
    <div className="w-full lg:h-180 md:h-120 h-80  border-b border-white/50">
      <iframe
        src={getEmbedUrl()}
        className="w-full h-full"
        style={{ border: "none" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        loading="lazy"
        title="Embedded Video"
      />
    </div>
  );
};

function extractYouTubeId(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([^&?/]+)/
  );
  return match ? match[1] : "";
}

function extractTikTokId(url: string): string {
  const match = url.match(/video\/(\d+)/);
  return match ? match[1] : "";
}

export default LinkPlayer;
