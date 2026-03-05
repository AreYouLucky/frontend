"use client"
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import Socials from "./socials";
import { useEffect, useState } from "react";
import PrefetchLink from "./prefetch-link";
import { ProgramsModel } from "@/types/models";

export default function Navbar({
    onMenuClick,
    programs

}: {
    onMenuClick: () => void;
    programs: ProgramsModel[]

}) {
    const [opacity, setOpacity] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [clicked, setClicked] = useState(false);

    const openDropdown = () => {
        if (!clicked) setDropdownOpen(true);
    };

    const closeDropdown = () => {
        if (!clicked) setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setClicked((prev) => !prev);
        setDropdownOpen((prev) => !prev);
    };
    useEffect(() => {
        const container = document.getElementById("app-scroll");

        if (!container) return;

        const maxScroll = 200;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const value = Math.min(scrollTop / maxScroll, 1);
            setOpacity(value);
        };

        container.addEventListener("scroll", handleScroll);

        return () => container.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <header
            className="absolute z-40 h-16 md:h-18 lg:h-16 w-full  backdrop-blur-md "
            style={{
                background: `rgba(0,0,0,${opacity})`,
                backdropFilter: opacity > 0.3 ? "blur(6px)" : "none",
            }}
        >
            <div className="flex h-full items-center justify-between md:px-6 px-2">
                <div className="flex ">
                    <Image
                        src="/storage/images/logos/dostv.png"
                        alt="DOSTV Logo"
                        width={120} height={100}
                        className="h-auto w-20 md:w-28"
                        priority
                    />

                    <nav className="hidden lg:flex items-center gap-4 ml-8 font-semibold text-white/80 uppercase text-[13px]">
                        <PrefetchLink href="#" className="hover:text-gray-300 hover:scale-105 duration-300 flex items-center gap-1"> Home</PrefetchLink>
                        <div
                            className="relative"
                            onMouseEnter={openDropdown}
                            onMouseLeave={closeDropdown}
                        >
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center gap-2 text-white/80 uppercase text-[13px]"
                            > 
                                Programs
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <div
                                className={`absolute border border-white/10 py-2 top-full left-0 mt-2 w-56 bg-gray-950/90 text-white rounded-lg shadow-xl n transition-all duration-300 
                                    ${dropdownOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}>
                                    {programs?.map((program, index) => (
                                        <PrefetchLink
                                            key={index}
                                            href={`/program/${program.slug}`}
                                            className="block px-4 py-2 hover:bg-gray-100 hover:text-gray-900 transition duration-300 hover:scale-105"
                                        >
                                            {program.title}
                                        </PrefetchLink>
                                    ))}
                            </div>
                        </div>

                        <PrefetchLink href="#" className="hover:text-gray-300 hover:scale-105 duration-300 flex items-center gap-1"> About</PrefetchLink>
                        <PrefetchLink href="#" className="hover:text-gray-300 hover:scale-105 duration-300 flex items-center gap-1"> Testimonial</PrefetchLink>
                        <PrefetchLink href="#" className="hover:text-gray-300 hover:scale-105 duration-300 flex items-center gap-1">Partners</PrefetchLink>
                        <PrefetchLink href="#" className="hover:text-gray-300 hover:scale-105 duration-300 flex items-center gap-1">Contacts</PrefetchLink>
                    </nav>
                </div>

                {/* Right */}
                <div className="flex items-center md:gap-3 gap-1 justify-end lg:w-full">
                    <div
                        className="flex items-center rounded-full border  border-white/50 md:px-5 px-3 md:py-2 py-1.5 transition text-white focus-within:bg-white focus-within:text-black"
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent text-sm outline-none md:w-50 lg:w-60 w-30 placeholder:text-gray-100 "
                        />
                        <FaSearch
                            className="ml-2"
                        />
                    </div>



                    <Socials className="hidden lg:flex" />
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden rounded-md p-2 transition"
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5 text-white" />
                    </button>

                </div>

            </div>
        </header>
    );
}
