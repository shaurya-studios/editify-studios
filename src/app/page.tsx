"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";
import Image from "next/image";
import TiltCard from "@/components/TiltCard";
import { VIDEO_PORTFOLIO, MARQUEE_ROW_1, MARQUEE_ROW_2, REVIEWS } from "@/lib/constants";

export default function Page() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Mask reveal animation for hero text
    const chars = textRef.current?.querySelectorAll(".char");
    if (chars) {
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.2,
        }
      );
    }

    // Fade up hero elements
    gsap.fromTo(
      ".fade-up-hero",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        delay: 1.2,
      }
    );

    // Grid items reveal
    gsap.utils.toArray<HTMLElement>(".grid-item").forEach((item) => {
      gsap.fromTo(
        item,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    });

    gsap.to(".marquee-parallax", {
      scrollTrigger: {
        trigger: ".marquee-parallax",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: -100,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="relative w-full min-h-[200vh]" ref={containerRef}>
      {/* Subtle noise background for texture (staple of Awwwards minimalism) */}
      <div 
        className="fixed inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
      />

      {/* Golden Accents in Background */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-yellow-600/10 dark:bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none z-[-1]" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-yellow-500/10 dark:bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none z-[-1]" />

      {/* Hero Section */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 px-6 pt-32 pb-20">
        
        <h1 
          ref={textRef} 
          className="text-[11vw] md:text-[8vw] font-bold leading-[0.85] tracking-tighter text-center uppercase flex flex-col items-center"
        >
          <div className="overflow-hidden py-1 md:py-2">
            {"EDITIFY".split("").map((char, i) => <span key={`e-${i}`} className="char inline-block translate-y-full">{char === " " ? "\u00A0" : char}</span>)}
          </div>
          <div className="overflow-hidden py-1 md:py-2 text-transparent dark:text-transparent" style={{ WebkitTextStroke: '2px currentColor', color: 'var(--foreground)' }}>
            {"STUDIOS".split("").map((char, i) => <span key={`ed-${i}`} className="char inline-block translate-y-full">{char === " " ? "\u00A0" : char}</span>)}
          </div>
        </h1>

        <p className="fade-up-hero mt-8 max-w-lg text-center text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
          High-retention cinematic execution for top-tier creators.
        </p>

        <div className="fade-up-hero flex flex-col sm:flex-row items-center gap-6 mt-12">
          <Magnetic>
            <a 
              href="https://discord.gg/JMhA5PERdS"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover 
              className="px-8 py-4 rounded-full bg-yellow-600 text-white dark:bg-yellow-500 dark:text-[#050505] flex items-center justify-center hover:scale-105 transition-transform duration-500 ease-out font-bold tracking-widest text-sm shadow-[0_0_30px_rgba(202,138,4,0.3)]"
            >
              BOOK A CALL
            </a>
          </Magnetic>
          <Magnetic>
            <button 
              onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })} 
              data-cursor-hover 
              className="px-8 py-4 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-500 ease-out font-bold tracking-widest text-sm"
            >
              VIEW WORK
            </button>
          </Magnetic>
        </div>

        {/* Credibility / Trust Bar */}
        <div className="fade-up-hero mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-16 border-t border-zinc-200 dark:border-zinc-800/50 pt-10 w-full max-w-4xl">
          <div className="flex flex-col items-center gap-2">
            <div className="flex -space-x-3 mb-1">
              <Image src="/jona_logo.jpg" alt="Joonah" width={32} height={32} className="rounded-full border-2 border-zinc-50 dark:border-[#050505] object-cover w-8 h-8" />
              <Image src="/logo1.jpg" alt="Client" width={32} height={32} className="rounded-full border-2 border-zinc-50 dark:border-[#050505] object-cover w-8 h-8" />
              <Image src="/logo2.jpg" alt="Client" width={32} height={32} className="rounded-full border-2 border-zinc-50 dark:border-[#050505] object-cover w-8 h-8" />
              <div className="w-8 h-8 rounded-full border-2 border-zinc-50 dark:border-[#050505] bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500 z-10 relative">+</div>
            </div>
            <span className="text-xs tracking-widest text-zinc-500 uppercase font-medium">Trusted by Creators</span>
          </div>
        </div>

      </section>

      {/* Works Section */}
      <section id="works" className="w-full px-5 md:px-10 py-32 z-10 relative bg-zinc-50/50 dark:bg-[#050505]/50 backdrop-blur-md">
        <div className="max-w-[2000px] mx-auto">
          <h2 className="grid-item text-[6vw] md:text-[4vw] font-bold leading-none tracking-tighter uppercase mb-20 text-zinc-900 dark:text-white">
            Latest Edits.
          </h2>
          
          <h3 className="grid-item text-2xl font-medium tracking-widest text-zinc-500 uppercase mb-8">Video Editing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {VIDEO_PORTFOLIO.map((videoSrc, i) => (
              <div key={i} className="grid-item group relative aspect-[4/5] bg-zinc-200 dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-300 dark:border-zinc-800 hover:border-yellow-600/50 transition-colors duration-500">
                <video src={videoSrc} controls preload="auto" loop muted playsInline className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] custom-video-controls" />
              </div>
            ))}
          </div>

          <h3 className="grid-item text-2xl font-medium tracking-widest text-zinc-500 uppercase mb-8 mt-32">Digital Art & Thumbnails</h3>
          
          <div className="relative w-full overflow-hidden flex flex-col gap-5 py-10 -mx-5 md:-mx-10 px-5 md:px-10 marquee-parallax">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-20 pointer-events-none" />
            
            {/* Row 1 - Moving Left */}
            <div className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] gap-5">
              {MARQUEE_ROW_1.map((imgSrc, i) => (
                <div key={`r1-${i}`} className="relative w-[300px] md:w-[400px] aspect-video rounded-3xl overflow-hidden group cursor-pointer border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                  <Image src={imgSrc} alt="Art" fill priority sizes="(max-width: 768px) 300px, 400px" className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                </div>
              ))}
              {/* Duplicate for seamless infinite scroll */}
              {MARQUEE_ROW_1.map((imgSrc, i) => (
                <div key={`r1-dup-${i}`} className="relative w-[300px] md:w-[400px] aspect-video rounded-3xl overflow-hidden group cursor-pointer border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                  <Image src={imgSrc} alt="Art" fill priority sizes="(max-width: 768px) 300px, 400px" className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                </div>
              ))}
            </div>

            {/* Row 2 - Moving Right */}
            <div className="flex w-max animate-[marqueeReverse_45s_linear_infinite] hover:[animation-play-state:paused] gap-5 -ml-[500px]">
              {MARQUEE_ROW_2.map((imgSrc, i) => (
                <div key={`r2-${i}`} className="relative w-[300px] md:w-[400px] aspect-square rounded-[2.5rem] overflow-hidden group cursor-pointer border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
                  <div className="absolute inset-0 bg-yellow-600/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10" />
                  <Image src={imgSrc} alt="Art" fill priority sizes="(max-width: 768px) 300px, 400px" className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] grayscale group-hover:grayscale-0" />
                </div>
              ))}
              {/* Duplicate for seamless infinite scroll */}
              {MARQUEE_ROW_2.map((imgSrc, i) => (
                <div key={`r2-dup-${i}`} className="relative w-[300px] md:w-[400px] aspect-square rounded-[2.5rem] overflow-hidden group cursor-pointer border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
                  <div className="absolute inset-0 bg-yellow-600/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10" />
                  <Image src={imgSrc} alt="Art" fill priority sizes="(max-width: 768px) 300px, 400px" className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] grayscale group-hover:grayscale-0" />
                </div>
              ))}
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-50% - 10px)); }
              }
              @keyframes marqueeReverse {
                0% { transform: translateX(calc(-50% - 10px)); }
                100% { transform: translateX(0); }
              }
            `}} />
          </div>
        </div>
      </section>



      {/* Reviews Section */}
      <section className="w-full px-5 md:px-10 py-32 z-10 relative bg-zinc-100 dark:bg-zinc-950">
        <div className="max-w-[2000px] mx-auto">
          <h2 className="grid-item text-[6vw] md:text-[4vw] font-bold leading-none tracking-tighter uppercase mb-20 text-zinc-900 dark:text-white">
            Client Voices.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((review, i) => (
              <div key={i} className="grid-item flex flex-col justify-between p-10 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black hover:border-yellow-600/50 transition-colors duration-500 shadow-sm">
                <div>
                  <div className="text-yellow-500 text-xl tracking-widest mb-6">★★★★★</div>
                  <p className="text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed mb-8">
                    &quot;{review.text}&quot;
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex-shrink-0">
                    {review.img ? (
                      <Image src={review.img} alt={review.name} fill sizes="48px" className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold">{review.name.charAt(0)}</div>
                    )}
                  </div>
                  <span className="text-sm font-bold tracking-widest uppercase text-zinc-900 dark:text-white">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full px-5 md:px-10 py-32 z-10 relative border-t border-zinc-200 dark:border-zinc-900/50">
        <div className="max-w-[2000px] mx-auto">
          <h2 className="grid-item text-[6vw] md:text-[4vw] font-bold leading-none tracking-tighter uppercase mb-20 text-zinc-900 dark:text-white">
            Investment.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Art Category */}
            <div className="grid-item">
              <TiltCard className="h-full">
                <div className="flex flex-col gap-5 p-10 h-full bg-zinc-50 dark:bg-[#09090b] relative z-10 rounded-[2rem]">
                  <h3 className="text-2xl font-medium tracking-widest text-zinc-500 uppercase mb-5">Digital Art</h3>
                  
                  <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-5">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold uppercase text-zinc-900 dark:text-white">Standard</span>
                      <span className="text-sm text-zinc-500 mt-2">Clean, high-quality bespoke artwork.</span>
                    </div>
                    <span className="text-3xl font-light text-zinc-900 dark:text-white">$20</span>
                  </div>
                  
                  <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-5 pt-5">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold uppercase text-zinc-900 dark:text-white">Premium</span>
                      <span className="text-sm text-zinc-500 mt-2">Complex compositions & unlimited revisions.</span>
                    </div>
                    <span className="text-3xl font-light text-zinc-900 dark:text-white">$50</span>
                  </div>

                  <div className="mt-auto pt-8">
                    <Magnetic>
                      <a href="https://discord.gg/JMhA5PERdS" target="_blank" rel="noreferrer" className="w-full block text-center py-4 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-bold tracking-widest text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                        START PROJECT
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Video Category - Creative Most Popular */}
            <div className="grid-item md:-mt-4 md:mb-4">
              <TiltCard glow className="h-full w-full">
                {/* Badge OUTSIDE the inner card so it isn't clipped */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center justify-center z-30" style={{ transform: "translateZ(30px)" }}>
                  <div className="absolute w-full h-full bg-yellow-500/60 blur-md rounded-full animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-[length:200%_auto] text-[#050505] px-8 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase shadow-[0_10px_20px_rgba(202,138,4,0.4)] border border-yellow-300/50 flex items-center gap-3 animate-pulse" style={{ animationDuration: '3s' }}>
                    <span>★</span>
                    Most Popular
                    <span>★</span>
                  </div>
                </div>

                <div className="relative flex flex-col gap-5 p-10 h-full bg-white dark:bg-[#050505] shadow-[0_0_40px_rgba(202,138,4,0.15)] z-10 rounded-[2rem] border border-yellow-600/30 overflow-hidden">
                  {/* Subtle internal animated gradient blobs */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-spin" style={{ animationDuration: '10s' }} />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />

                  <h3 className="text-2xl font-medium tracking-widest text-zinc-500 uppercase mb-5 mt-4 relative z-20">Video Editing</h3>
                  
                  <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-5 relative z-20">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold uppercase text-zinc-900 dark:text-white">Standard</span>
                      <span className="text-sm text-zinc-500 mt-2">Professional cuts, color correction & sound.</span>
                    </div>
                    <span className="text-4xl font-bold text-yellow-600 dark:text-yellow-500 tracking-tighter drop-shadow-[0_0_15px_rgba(202,138,4,0.4)]">$50</span>
                  </div>
                  
                  <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-5 pt-5 relative z-20">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold uppercase text-zinc-900 dark:text-white">Premium</span>
                      <span className="text-sm text-zinc-500 mt-2">Advanced VFX, motion graphics & cinematic grade.</span>
                    </div>
                    <span className="text-3xl font-light text-zinc-900 dark:text-white">$100</span>
                  </div>

                  <div className="mt-auto pt-8 relative z-20">
                    <Magnetic>
                      <a href="https://discord.gg/JMhA5PERdS" target="_blank" rel="noreferrer" className="w-full block text-center py-4 rounded-full bg-yellow-600 text-white dark:bg-yellow-500 dark:text-[#050505] font-bold tracking-widest text-sm hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(202,138,4,0.2)]">
                        START PROJECT
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>

          {/* Bulk Orders Note */}
          <Magnetic>
            <a href="https://discord.gg/JMhA5PERdS" target="_blank" rel="noreferrer" className="grid-item mt-10 p-8 rounded-[2rem] border border-zinc-200/50 bg-white/30 dark:border-zinc-800/50 dark:bg-zinc-950/30 backdrop-blur-sm flex flex-col items-center justify-center text-center hover:border-yellow-600/30 hover:bg-yellow-600/5 dark:hover:bg-yellow-500/5 transition-all duration-500 cursor-pointer w-full block">
              <h3 className="text-xl font-bold uppercase text-zinc-900 dark:text-white mb-2 tracking-widest">Bulk Orders</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">We offer flexible pricing for high-volume clients. Click to negotiate a custom package.</p>
            </a>
          </Magnetic>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="w-full px-10 py-20 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 text-zinc-500 uppercase tracking-widest text-xs z-10 relative bg-zinc-50 dark:bg-[#050505]">
        <div>
          <span className="text-zinc-900 dark:text-white font-bold block mb-2 text-lg">EDITIFY STUDIOS</span>
          &copy; 2026 All Rights Reserved
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-10">
          <Link data-cursor-hover href="/privacy" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
          <Link data-cursor-hover href="/terms" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms &amp; Conditions</Link>
          <a data-cursor-hover href="https://discord.gg/JMhA5PERdS" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Discord</a>
          <a data-cursor-hover href="https://www.youtube.com/@Editify-n1o" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">YouTube</a>
        </div>
      </footer>
    </main>
  );
}


