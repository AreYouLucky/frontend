"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { LuFolderSearch2 } from "react-icons/lu";
import { useGetSearchedPosts } from "@/hooks/home/home-mount";
import ImageLoader from "../ui/image-loader";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
    inputRef.current?.focus();
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

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

  return (
    <div ref={containerRef} className="relative w-55 md:w-95 lg:w-100">
      <div
        className="w-full group flex items-center lg:gap-3 gap-2 overflow-hidden rounded-xl bg-zinc-900/10 border border-white/60  lg:px-3 px-2 py-px text-white   transition duration-300  focus-within:bg-black/50 "
      >
        <div className="flex w-4 h-7 md:h-9 md:w-9 shrink-0 items-center justify-center  ">
          <FaSearch className="text-sm" />
        </div>
        <input
          type="text"
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Explore science stories…"
          className="w-full placeholder:lg:text-[10.5px] placeholder:md:text-[10px] placeholder:text-[8px] bg-transparent lg:text-[12px] text-[11px]  font-semibold tracking-wider uppercase text-white focus-within:text-white  focus-within:placeholder:text-gray-400 outline-none placeholder:text-white/80"
        />
        <Link href={"/advance-search"} className="pl-2 border-l border-white/80 ">
          <LuFolderSearch2 className=" text-xl hover:scale-110 duration-300" />
        </Link>
      </div>

      {showResults && (
        <div className="absolute left-0 z-50 lg:mt-4 md:mt-7 mt-12 w-full overflow-hidden rounded-xl border border-white/50 px-3 backdrop-blur lg:scale-105 md:scale-110 scale-120 bg-zinc-900/90 text-white shadow-[#00aeef]/40 shadow-xl  fade-down">
          <div className="flex items-center justify-between border-b border-white/40 px-2 py-3">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/75">
              RESULTS
            </span>
          </div>

          <div
            ref={resultsContainerRef}
            onScroll={handleResultsScroll}
            className="lg:max-h-120 md:max-h-110 max-h-90 overflow-y-auto overflow-x-hidden scroll-slim"
          >
            {isFetching && (
              <div className="flex items-center gap-2 px-2 py-5 text-sm text-white/70 ">
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
                  setIsOpen(false);
                }}
                className="group flex items-center gap-3 border-b border-white/20 px-2 py-3 hover:bg-white/6 "
              >
                <div className="relative h-12 lg:w-25 w-20 shrink-0 overflow-hidden bg-white/5">
                  {post.thumbnail ? (
                    <ImageLoader
                      src={`/storage/images/post_images/thumbnails/${post.thumbnail}`}
                      alt={post.title ?? "Search result"}
                      className="h-full w-full object-cover transition duration-300 rounded-sm  border-white/60 border"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                      DOSTv
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <span className="mt-1 block lg:text-[12px] md:text-[11px] text-[10.5px] font-medium  tracking-wide text-white/92 line-clamp-2 mb-2">
                    {post.title}
                  </span>
                  <div className="lg:text-[9px] text-[8.5px] font-semibold uppercase tracking-wide text-white rounded-sm  border border-white/40 w-fit px-1 py-px">
                    {post?.post_program?.title ?? ""}
                  </div>
                </div>
              </Link>
            ))}

            {isFetchingNextPage && (
              <div className="px-4 py-4 text-sm text-white/55 flex gap-3 items-center">
                <FaSpinner className="animate-spin text-white/70" />
                Loading more...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
