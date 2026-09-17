"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Magnetic from "@/components/Magnetic";
import { Mail, MessageSquare, ExternalLink, Copy } from "lucide-react";

export default function ShauryaStudiosPage() {
  const textRef = useRef<HTMLHeadingElement>(null);

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

    gsap.fromTo(
      ".fade-up",
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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("shaurya.studios.dev@gmail.com");
    alert("Email copied to clipboard!");
  };

  return (
    <main className="relative w-full min-h-screen bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-white pb-32">
      {/* Background Ambience (Teal instead of Gold) */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-teal-600/10 dark:bg-teal-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <section className="min-h-[70vh] w-full flex flex-col items-center justify-center relative z-10 px-6 pt-32 pb-10 overflow-hidden">
        {/* Animated Gradient Orbs specific to Shaurya Studios */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-teal-500/20 blur-[100px] rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-cyan-400/20 blur-[80px] rounded-full animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        
        {/* Premium Badge */}
        <div className="fade-up mb-8 px-6 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 backdrop-blur-md flex items-center gap-2 shadow-[0_0_20px_rgba(20,184,166,0.15)]">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-teal-400 absolute" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-300">The Sub-Brand</span>
        </div>

        <h1 
          ref={textRef} 
          className="text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter text-center flex flex-col items-center relative z-10"
        >
          <div className="overflow-hidden py-1 md:py-2">
            {"SHAURYA".split("").map((char, i) => <span key={`s-${i}`} className="char inline-block translate-y-full drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">{char === " " ? "\u00A0" : char}</span>)}
          </div>
          <div className="overflow-hidden py-1 md:py-2 relative">
            {"STUDIOS".split("").map((char, i) => <span key={`st-${i}`} className="char inline-block translate-y-full text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] drop-shadow-[0_0_20px_rgba(20,184,166,0.4)]">{char === " " ? "\u00A0" : char}</span>)}
          </div>
        </h1>
        
        <p className="fade-up mt-10 max-w-2xl text-center text-zinc-400 text-lg md:text-xl font-medium leading-relaxed relative z-10">
          Where <span className="text-white font-bold">elite engineering</span> meets <span className="text-teal-400 font-bold">cinematic video production.</span><br className="hidden md:block"/> We build high-retention experiences.
        </p>
      </section>

      {/* Portfolio Videos */}
      <section className="w-full px-5 md:px-10 py-20 z-10 relative">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="fade-up text-2xl font-bold tracking-widest text-teal-600 dark:text-teal-500 uppercase mb-10 text-center">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              "https://media.githubusercontent.com/media/shaurya-studios/editify-studios/main/public/shaurya1.mp4",
              "https://media.githubusercontent.com/media/shaurya-studios/editify-studios/main/public/shaurya2.mp4",
              "https://media.githubusercontent.com/media/shaurya-studios/editify-studios/main/public/shaurya3.mp4"
            ].map((videoSrc, i) => (
              <div key={i} className="fade-up group relative aspect-[4/5] bg-zinc-200 dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-300 dark:border-zinc-800 hover:border-teal-500/50 transition-colors duration-500">
                <video src={videoSrc} controls preload="auto" loop muted playsInline className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] custom-video-controls" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (Recreating the Dark Modal Design) */}
      <section className="w-full px-5 md:px-10 py-20 z-10 relative flex justify-center">
        <div className="fade-up w-full max-w-2xl bg-[#0d1114] rounded-3xl p-8 md:p-12 border border-[#1a2327] shadow-2xl relative overflow-hidden">
          {/* Subtle teal glow in the corner of the modal */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-6 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            Direct Inquiries &bull; Available for new projects
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">LET&apos;S BUILD SOMETHING GREAT.</h2>
          <p className="text-zinc-400 mb-10">Reach out on your preferred channel below.</p>

          <div className="flex flex-col gap-4">
            
            {/* Email Button */}
            <Magnetic>
              <button onClick={copyEmail} className="w-full group flex items-center justify-between p-4 md:p-5 rounded-2xl bg-[#13181c] border border-[#1e272b] hover:border-teal-500/50 hover:bg-[#161c21] transition-all duration-300 text-left">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0d1114] border border-[#1e272b] flex items-center justify-center text-zinc-400 group-hover:text-teal-400 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-[0.1em] text-zinc-500 uppercase">Direct Email</span>
                    <span className="text-white font-mono text-sm md:text-base">shaurya.studios.dev@gmail.com</span>
                  </div>
                </div>
                <div className="text-zinc-500 group-hover:text-white transition-colors">
                  <Copy size={18} />
                </div>
              </button>
            </Magnetic>

            {/* Discord Button */}
            <Magnetic>
              <a href="https://discord.gg/JMhA5PERdS" target="_blank" rel="noreferrer" className="w-full group flex items-center justify-between p-4 md:p-5 rounded-2xl bg-[#13181c] border border-[#1e272b] hover:border-[#5865F2]/50 hover:bg-[#161c21] transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0d1114] border border-[#1e272b] flex items-center justify-center text-zinc-400 group-hover:text-[#5865F2] transition-colors">
                    <MessageSquare size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-[0.1em] text-zinc-500 uppercase">Discord Community & DM</span>
                    <span className="text-white font-mono text-sm md:text-base">Connect on Discord (@shauryaa74)</span>
                  </div>
                </div>
                <div className="text-zinc-500 group-hover:text-white transition-colors">
                  <ExternalLink size={18} />
                </div>
              </a>
            </Magnetic>

            {/* Fiverr Web Dev */}
            <Magnetic>
              <a href="#" className="w-full group flex items-center justify-between p-4 md:p-5 rounded-2xl bg-[#13181c] border border-[#1e272b] hover:border-[#1dbf73]/50 hover:bg-[#161c21] transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0d1114] border border-[#1e272b] flex items-center justify-center text-zinc-400 group-hover:text-[#1dbf73] transition-colors font-bold text-lg font-serif italic">
                    fi
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-[0.1em] text-zinc-500 uppercase">Fiverr Escrow Protected</span>
                    <span className="text-white font-mono text-sm md:text-base">Full-Stack Web Dev Gig</span>
                  </div>
                </div>
                <div className="text-zinc-500 group-hover:text-white transition-colors">
                  <ExternalLink size={18} />
                </div>
              </a>
            </Magnetic>

            {/* Fiverr Video Editing */}
            <Magnetic>
              <a href="https://www.fiverr.com/s/qDExmAV" target="_blank" rel="noreferrer" className="w-full group flex items-center justify-between p-4 md:p-5 rounded-2xl bg-[#13181c] border border-[#1e272b] hover:border-[#1dbf73]/50 hover:bg-[#161c21] transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0d1114] border border-[#1e272b] flex items-center justify-center text-zinc-400 group-hover:text-[#1dbf73] transition-colors font-bold text-lg font-serif italic">
                    fi
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-[0.1em] text-zinc-500 uppercase">Fiverr Studio</span>
                    <span className="text-white font-mono text-sm md:text-base">Video Editing & Production</span>
                  </div>
                </div>
                <div className="text-zinc-500 group-hover:text-white transition-colors">
                  <ExternalLink size={18} />
                </div>
              </a>
            </Magnetic>

          </div>
          
          <div className="mt-8 pt-8 border-t border-[#1e272b] flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><span className="text-teal-500">✦</span> Direct Communication</span>
            <span>100% Response Rate</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-10 py-10 flex justify-center items-center text-zinc-500 uppercase tracking-widest text-xs z-10 relative">
        &copy; 2026 Shaurya Studios
      </footer>
    </main>
  );
}
