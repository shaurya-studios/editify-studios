"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";
import { useDeviceMode } from "./DeviceModeProvider";
import { Monitor, Smartphone } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const deviceMode = useDeviceMode();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-between items-center px-6 md:px-10 py-6 ${
        scrolled ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-[0_4px_30px_rgba(202,138,4,0.05)]" : "bg-transparent"
      }`}
    >
      {/* Subtle golden bottom border on scroll */}
      <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />
      
      <Link 
        href="/" 
        onClick={(e) => {
          if (window.location.pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        data-cursor-hover 
        className="flex items-center gap-3 z-50 group"
      >
        <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-105 rounded-full overflow-hidden border border-yellow-600/30">
          <Image src="/logo.png" alt="Editify Logo" fill className="object-cover" />
        </div>
        <span className="text-zinc-900 dark:text-white font-bold text-xl tracking-widest lowercase">editify</span>
      </Link>

      <div className="flex items-center gap-6 z-50">
        <nav className="hidden md:flex items-center gap-10 mr-4">
          <Magnetic>
            <button 
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = "/#works";
                }
              }}
              data-cursor-hover 
              className="group relative text-sm font-medium uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors cursor-pointer"
            >
              Works
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          </Magnetic>
          <Magnetic>
            <button 
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = "/#pricing";
                }
              }}
              data-cursor-hover 
              className="group relative text-sm font-medium uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors cursor-pointer"
            >
              Prices
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          </Magnetic>
          <Magnetic>
            <Link href="/about" data-cursor-hover className="group relative text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
              About
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link 
              href="/shaurya-studios" 
              onClick={(e) => {
                if (window.location.pathname === "/shaurya-studios") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              data-cursor-hover 
              className="group relative text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 hover:text-teal-500 transition-colors bg-teal-500/10 px-4 py-2 rounded-full border border-teal-500/30 ml-4 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              Shaurya Studios
            </Link>
          </Magnetic>
        </nav>
        
        {/* Device Mode Toggle */}
        <Magnetic>
          <button 
            data-cursor-hover
            onClick={() => deviceMode.toggleMode()}
            className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:border-yellow-600 transition-colors bg-white dark:bg-black"
            aria-label="Toggle device mode"
          >
            {deviceMode.mode === 'pc' ? <Monitor size={18} /> : <Smartphone size={18} />}
          </button>
        </Magnetic>

        <ThemeToggle />
      </div>
    </header>
  );
}
