import React from "react";
import {
  FaFacebookF,
  FaFacebookMessenger,
  FaWhatsapp,
  FaTwitter,
  FaEnvelope,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";

type ShareButtonsProps = {
  url: string;
  title?: string;
  className?: string;
};

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title = "Check this out!",
  className = "",
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    messenger: `fb-messenger://share?link=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    tiktok: `https://www.tiktok.com/upload?url=${encodedUrl}`,
    instagram: `https://www.instagram.com/`, // no direct share support
  };

  const openShare = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`flex gap-3 ${className}`}>
      <button onClick={() => openShare(shareLinks.facebook)}>
        <FaFacebookF  className="hover:scale-110 duration-300 cursor-pointer text-xl"/>
      </button>

      <button onClick={() => openShare(shareLinks.messenger)}>
        <FaFacebookMessenger  className="hover:scale-110 duration-300 cursor-pointer text-xl"/>
      </button>

      <button onClick={() => openShare(shareLinks.whatsapp)}>
        <FaWhatsapp  className="hover:scale-110 duration-300 cursor-pointer text-xl"/>
      </button>

      <button onClick={() => openShare(shareLinks.twitter)}>
        <FaTwitter  className="hover:scale-110 duration-300 cursor-pointer text-xl"/>
      </button>

      <button onClick={() => openShare(shareLinks.email)}>
        <FaEnvelope  className="hover:scale-110 duration-300 cursor-pointer text-xl"/>
      </button>

      <button onClick={() => openShare(shareLinks.tiktok)}>
        <FaTiktok  className="hover:scale-110 duration-300 cursor-pointer text-xl"/>
      </button>

      <button onClick={() => openShare(shareLinks.instagram)}>
        <FaInstagram  className="hover:scale-110 duration-300 cursor-pointer text-xl"/>
      </button>
    </div>
  );
};

export default ShareButtons;