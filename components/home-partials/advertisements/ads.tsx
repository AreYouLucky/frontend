"use client";

import { useState } from "react";
import AdsCard from "./ads-card";
import { AdvertisementModel } from "@/types/models";
export default function Ads({ads}: {ads: AdvertisementModel[]}) {
    const [visible, setVisible] = useState(() => {
        if (typeof window === "undefined") return false;
        return !localStorage.getItem("side_ad_closed");
    });

    const closeAd = () => {
        localStorage.setItem("side_ad_closed", "true");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed left-4 bottom-3 w-84  shadow-sm border-2  shadow-white/90 rounded-lg z-50">
            <button onClick={closeAd} className="absolute top-0 right-0 text-white font-bold text-lg z-30 bg-black rounded-full px-2">✕</button>
            <AdsCard ads={ads}/>
        </div>
    );
}