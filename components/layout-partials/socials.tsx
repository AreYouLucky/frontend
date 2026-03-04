import React from 'react'
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function Socials({className}:{className?:string}) {
    return (
        <div className={`flex gap-4 ${className}`}>
            <Link href="https://www.facebook.com/DOSTvPH/" target="_blank" rel="noopener noreferrer" className=" bg-black flex items-center justify-center rounded-full  text-white hover:scale-105 duration-300">
                <FaFacebook className="h-5 w-5" />
            </Link>
            <Link href="https://twitter.com/DOSTvPH/" target="_blank" rel="noopener noreferrer" className=" bg-black flex items-center justify-center rounded-md  text-white hover:scale-105 duration-300">
                <FaSquareXTwitter className="h-5 w-5" />
            </Link>
            <Link href="https://www.instagram.com/dostvph/" target="_blank" rel="noopener noreferrer" className=" bg-black flex items-center justify-center rounded-md  text-white hover:scale-105 duration-300">
                <FaInstagram className="h-5 w-5" />
            </Link>
            <Link href="https://www.instagram.com/dostvph/" target="_blank" rel="noopener noreferrer" className=" h-fit px-0.5 bg-black flex items-center justify-center rounded-md  text-white hover:scale-105 duration-300">
                <FaYoutube className="h-5 w-5" />
            </Link>

        </div>
    )
}

export default Socials