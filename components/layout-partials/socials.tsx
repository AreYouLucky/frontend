import React from 'react'
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

function Socials({className}:{className?:string}) {
    return (
        <div className={`flex gap-4 ${className}`}>
            <Link href="https://www.facebook.com/DOSTvPH/" target="_blank" rel="noopener noreferrer" className=" bg-black flex items-center justify-center rounded-full  text-white hover:scale-105 duration-300">
                <FaFacebook className="h-6 w-6" />
            </Link>
            <Link href="https://www.tiktok.com/@dostv.ph" target="_blank" rel="noopener noreferrer" className=" bg-black flex items-center justify-center rounded-md  text-white hover:scale-105 duration-300">
                <AiFillTikTok className="h-6 w-6" />
            </Link>
            <Link href="https://www.instagram.com/dostvph/" target="_blank" rel="noopener noreferrer" className=" flex items-center justify-center rounded-md  text-white hover:scale-105 duration-300">
                <FaInstagram className="h-6 w-6" />
            </Link>
            <Link href="https://www.youtube.com/@DOSTvPH" target="_blank" rel="noopener noreferrer" className=" h-fit px-0.5 bg-black flex items-center justify-center rounded-md  text-white hover:scale-105 duration-300">
                <FaYoutube className="h-6 w-6" />
            </Link>

        </div>
    )
}

export default Socials