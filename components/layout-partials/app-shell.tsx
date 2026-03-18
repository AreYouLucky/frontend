"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { type mountsProps } from "@/types/models";
import Footer from "./footer";

export default function AppShell({ mounts, children, }: { children: React.ReactNode; mounts: mountsProps; }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("collapsed") === "true";
  });

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("collapsed", String(next));
      return next;
    });
  };

  return (
    <div className="flex min-h-screen">
      <div className="shrink-0">
        <Sidebar
          open={sidebarOpen}
          collapsed={collapsed}
          onClose={() => setSidebarOpen(false)}
          onToggleCollapse={toggleCollapse}
          programs={mounts.programs}
        />
      </div>

      <div
        className="flex flex-1 flex-col relative min-w-0 h-screen bg-gray-900/60"
      >
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,#004e92,transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.1),rgba(5,5,5,1))]' />
        <div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent' />
        <Navbar
          programs={mounts.programs}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex-1 overflow-y-auto scroll-slim relative" id="app-scroll">
          <main className="w-full min-h-screen overflow-x-hidden z-10 relative">
            {children}
          </main>
          <footer className="relative z-0 pt-10">
            <Footer categories={mounts.categories} />
          </footer>

        </div>
      </div>
    </div>

  );
}
