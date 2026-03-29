"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { LuFolderSearch2 } from "react-icons/lu";
import { useGetSearchedPosts } from "@/hooks/home/home-mount";
import ImageLoader from "../ui/image-loader";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const resultsContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const normalizedInput = input.trim();
      setSearch((current) =>
        current === normalizedInput ? current : normalizedInput
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setIsMobileSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (isMobileSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isMobileSearchOpen]);

  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetSearchedPosts(search);

  const results =
    data?.pages
      .flatMap((page) => page.data)
      .filter((post) => post.post_id && post.slug && post.title) ?? [];

  const showResults = isOpen && search.length > 0;

  const handleResultsScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const nearBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 120;

    if (nearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const closeAllPanels = () => {
    setIsOpen(false);
    setIsMobileSearchOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-auto md:w-95 lg:w-100">
      <button
        type="button"
        onClick={() => {
          setIsMobileSearchOpen((current) => !current);
          setIsOpen(false);
        }}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/60 bg-zinc-900/20 text-white transition duration-300 hover:bg-black/40 md:hidden"
        aria-label="Open search"
      >
        <FaSearch className="text-sm" />
      </button>

      <div className="hidden md:block">
        <div className="w-full group flex items-center gap-2 overflow-hidden rounded-xl border border-white/60 bg-zinc-900/10 px-2 py-px text-white transition duration-300 focus-within:bg-black/50 lg:gap-3 lg:px-3">
          <div className="flex h-7 w-4 shrink-0 items-center justify-center md:h-9 md:w-9">
            <FaSearch className="text-sm" />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Explore science stories..."
            className="w-full bg-transparent text-[11px] font-semibold uppercase tracking-wider text-white outline-none placeholder:text-[8px] placeholder:text-white/80 focus-within:text-white focus-within:placeholder:text-gray-400 md:placeholder:text-[10px] lg:text-[12px] lg:placeholder:text-[10.5px]"
          />
          <Link href="/advance-search" className="border-l border-white/80 pl-2">
            <LuFolderSearch2 className="text-xl duration-300 hover:scale-110" />
          </Link>
        </div>
      </div>

      {(showResults || isMobileSearchOpen) && (
        <div className="absolute right-0 z-50 w-[min(20rem,calc(100vw-1.5rem))] overflow-hidden rounded-xl border border-white/50 bg-zinc-900/90 px-3 text-white shadow-xl shadow-[#00aeef]/40 backdrop-blur fade-down md:left-0 md:right-auto top-auto md:mt-7 md:w-full md:scale-110 lg:mt-4 lg:scale-105">
          {isMobileSearchOpen && (
            <div className="py-4 space-y-3">
              {/* Search Row */}
              <div className="flex items-center gap-2 md:hidden">
                <div className="flex flex-1 items-center gap-2 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-sky-400/50 transition">
                  <FaSearch className="text-white/70 text-sm" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search stories..."
                    className="w-full bg-transparent text-[12px] font-medium tracking-wide text-white outline-none placeholder:text-white/50"
                  />
                </div>

                <button
                  type="button"
                  onClick={closeAllPanels}
                  className="rounded-2xl border border-white/20 bg-white/5 px-3 py-2 text-[11px] font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  Close
                </button>
              </div>

              <Link href="/advance-search">
                <div className=" group flex items-center justify-between rounded-2xl border border-white/20 bg-[#004a95]/70 px-4 py-2 backdrop-blur-md shadow-md transition hover:scale-[1.02] hover:from-sky-500/30 hover:to-indigo-500/30">
                  <span className="text-sm font-semibold tracking-wide text-white">
                    Advanced Search
                  </span>

                  <LuFolderSearch2 className="text-xl text-white/80 transition group-hover:scale-110 group-hover:text-white" />
                </div>
              </Link>
            </div>
          )}
          {showResults && (
            <>
              <div className="flex items-center justify-between border-b border-white/40 px-2 py-3">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/75">
                  RESULTS
                </span>
              </div>
              <div
                ref={resultsContainerRef}
                onScroll={handleResultsScroll}
                className="max-h-90 overflow-x-hidden overflow-y-auto scroll-slim md:max-h-110 lg:max-h-120"
              >
                {isFetching && (
                  <div className="flex items-center gap-2 px-2 py-5 text-sm text-white/70">
                    <FaSpinner className="animate-spin text-white/70" />
                    <span>Searching...</span>
                  </div>
                )}

                {!isFetching && results.length === 0 && (
                  <div className="px-2 py-6">
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-white">
                      No results
                    </div>
                    <p className="mt-2 text-sm text-white/55">
                      Try a program title, episode name, or keyword.
                    </p>
                  </div>
                )}

                {results.map((post) => (
                  <Link
                    key={post.post_id}
                    href={`/post/${post.slug}`}
                    onClick={() => {
                      setInput("");
                      setSearch("");
                      closeAllPanels();
                    }}
                    className="group flex items-center gap-3 border-b border-white/20 px-2 py-3 hover:bg-white/6"
                  >
                    <div className="relative h-12 w-20 shrink-0 overflow-hidden bg-white/5 lg:w-25">
                      {post.thumbnail ? (
                        <ImageLoader
                          src={`/storage/images/post_images/thumbnails/${post.thumbnail}`}
                          alt={post.title ?? "Search result"}
                          className="h-full w-full rounded-sm border border-white/60 object-cover transition duration-300"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                          DOSTv
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="mb-2 mt-1 block line-clamp-2 text-[10.5px] font-medium tracking-wide text-white/92 md:text-[11px] lg:text-[12px]">
                        {post.title}
                      </span>
                      <div className="w-fit rounded-sm border border-white/40 px-1 py-px text-[8.5px] font-semibold uppercase tracking-wide text-white lg:text-[9px]">
                        {post?.post_program?.title ?? ""}
                      </div>
                    </div>
                  </Link>
                ))}

                {isFetchingNextPage && (
                  <div className="flex items-center gap-3 px-4 py-4 text-sm text-white/55">
                    <FaSpinner className="animate-spin text-white/70" />
                    Loading more...
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
