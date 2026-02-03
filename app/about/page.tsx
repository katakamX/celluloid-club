"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Oswald, Courier_Prime } from "next/font/google";
import { useEffect, useState } from "react";

// ================= FONT SETUP =================
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-oswald",
});

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
});

// ================= COMPONENT: TICKET BUTTON =================
const TicketButton = ({ text, number, href, isPrimary = false, onClick }) => {
  const baseStyles = `
    group relative flex items-center justify-between
    h-16 px-6 
    transition-all duration-300 ease-out
    hover:-translate-y-1 hover:shadow-lg
    before:absolute before:inset-0 before:bg-[#1C1A17] before:transition-transform before:duration-300 before:scale-x-0 before:origin-left hover:before:scale-x-100
    cursor-pointer select-none
  `;

  const maskStyle = {
    maskImage: `radial-gradient(circle at left center, transparent 8px, black 8.5px), radial-gradient(circle at right center, transparent 8px, black 8.5px)`,
    WebkitMaskImage: `radial-gradient(circle at left center, transparent 8px, black 8.5px), radial-gradient(circle at right center, transparent 8px, black 8.5px)`,
    maskComposite: "exclude",
    WebkitMaskComposite: "source-in",
  };

  const content = (
    <div
      className={`
        w-full h-full border border-[#1C1A17] 
        ${isPrimary ? "bg-[#8B2E2E] text-[#EAD7B0] border-[#8B2E2E]" : "bg-[#EAD7B0]/10 text-[#1C1A17]"}
        flex items-center justify-between px-6
        group-hover:text-[#EAD7B0] group-hover:border-[#1C1A17]
        transition-colors duration-300
      `}
      style={maskStyle}
    >
      <div className={`absolute left-[70%] top-2 bottom-2 w-[1px] border-l border-dashed ${isPrimary ? "border-[#EAD7B0]/50" : "border-[#1C1A17]/50"} group-hover:border-[#EAD7B0]/50`} />
      <span className="font-[family-name:var(--font-oswald)] uppercase tracking-[0.2em] text-lg z-10">{text}</span>
      <span className={`font-[family-name:var(--font-courier)] text-xs tracking-widest opacity-70 z-10 pl-8 ${isPrimary ? "text-[#EAD7B0]" : "text-[#1C1A17] group-hover:text-[#EAD7B0]"}`}>NO.{number}</span>
    </div>
  );

  if (href) return <Link href={href} className={baseStyles}>{content}</Link>;
  return <button onClick={onClick} className={baseStyles}>{content}</button>;
};

// ================= COMPONENT: WANDERING ICON =================
const WanderingIcon = ({ children, onCapture, isInteractive = false }) => {
  const [position, setPosition] = useState({ x: 50, y: 50, rotation: 0 });
  
  useEffect(() => {
    const moveIcon = () => {
      if (typeof window === 'undefined') return;
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;
      setPosition({ 
        x: Math.random() * maxX, 
        y: Math.random() * maxY, 
        rotation: isInteractive ? Math.random() * 60 - 30 : Math.random() * 360 
      });
    };
    
    const initialTimeout = setTimeout(() => {
       moveIcon();
       const interval = setInterval(moveIcon, isInteractive ? 2500 : 3500);
       return () => clearInterval(interval);
    }, Math.random() * 1000);

    return () => clearTimeout(initialTimeout);
  }, [isInteractive]);

  return (
    <div
      onClick={(e) => { e.stopPropagation(); if (isInteractive && onCapture) onCapture(); }}
      className={`fixed transition-all ease-in-out hover:scale-110 
        ${isInteractive ? 'z-50 cursor-crosshair opacity-100 duration-[2500ms]' : 'z-30 cursor-default opacity-40 hover:opacity-80 duration-[4000ms]'}`}
      style={{ left: position.x, top: position.y, transform: `rotate(${position.rotation}deg)` }}
    >
      {children}
      {isInteractive && <div className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_5px_rgba(220,38,38,1)]" />}
    </div>
  );
};

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  const handleCameraClick = () => {
    setIsTransitioning(true);
    setTimeout(() => { router.push("/lead-of-leads"); }, 1200);
  };

  const svgProps = {
    width: "48", height: "48", viewBox: "0 0 24 24", fill: "none",
    stroke: "#1C1A17", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round",
    className: "drop-shadow-lg"
  };

  return (
    // FIX 1: Removed bg-[#EAD7B0] from main so transparency works
    <main className={`min-h-screen text-[#1C1A17] relative overflow-hidden selection:bg-[#8B2E2E] selection:text-[#EAD7B0] ${oswald.variable} ${courier.variable}`}>
      
      {/* ================= TRANSITION OVERLAY ================= */}
      <div 
        className={`fixed inset-0 bg-[#1C1A17] z-[100] pointer-events-none transition-all duration-[1200ms] ease-in-out`}
        style={{ clipPath: isTransitioning ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)" }}
      >
        <div className={`absolute inset-0 flex items-center justify-center opacity-0 ${isTransitioning ? 'opacity-100 delay-500' : ''} transition-opacity`}>
             <h2 className="text-[#EAD7B0] font-[family-name:var(--font-courier)] tracking-widest text-xl animate-pulse">LOADING PAGE...</h2>
        </div>
      </div>

      {/* ================= ATMOSPHERIC LAYERS (MATCHING HOME) ================= */}
      
      {/* 1. Base Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#F5E6C8] via-[#EAD7B0] to-[#C8B085] -z-30" />
      
      {/* 2. Film Grain (SVG Noise) */}
      <div className="fixed inset-0 opacity-20 pointer-events-none mix-blend-multiply -z-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      
      {/* 3. Projector Beam */}
      <div className="fixed inset-0 pointer-events-none -z-18 mix-blend-soft-light opacity-40 animate-beam-rotate overflow-hidden"><div className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_45%,rgba(255,245,220,0.3)_50%,transparent_55%)]"></div></div>
      
      {/* 4. Scratches */}
      <div className="fixed inset-0 pointer-events-none -z-16 mix-blend-overlay opacity-30 animate-scratch-jitter"><div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_50px,rgba(0,0,0,0.2)_50px,rgba(0,0,0,0.2)_51px)] scale-[2]"></div></div>
      
      {/* 5. Dust & Flicker (This was missing from your About page snippet) */}
      <div className="fixed inset-0 pointer-events-none -z-15 animate-flicker mix-blend-overlay opacity-30 bg-[url('https://www.transparenttextures.com/patterns/dust.png')]"></div>
      
      {/* 6. Vignette */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)] pointer-events-none -z-10" />


      {/* ================= WANDERING ICONS ================= */}
      {mounted && !isTransitioning && (
        <WanderingIcon isInteractive={true} onCapture={handleCameraClick}>
           <svg {...svgProps} className={`${svgProps.className} fill-[#EAD7B0]`}>
             <path d="M5 12h14" />
             <path d="M5 12l4-8h6l4 8" />
             <path d="M5 21l7-9 7 9" />
             <path d="M5 21h14" />
          </svg>
        </WanderingIcon>
      )}

      {/* ================= CONTENT ================= */}
      <section className={`min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative py-20 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 h-32 w-[1px] bg-[#1C1A17] opacity-20" />

        <div className="relative z-10 max-w-5xl">
          <h1 className={`font-[family-name:var(--font-oswald)] text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter mb-6 ${mounted ? 'animate-bulb-on' : 'opacity-0'}`}>
            <span className="mix-blend-hard-light">About The Club</span>
          </h1>

          <div className="w-24 h-[2px] bg-[#8B2E2E] mx-auto mb-10" />

          <p className="font-[family-name:var(--font-courier)] text-lg md:text-2xl leading-loose tracking-wide opacity-90 max-w-3xl mx-auto">
            <span className="font-bold text-[#8B2E2E] bg-[#1C1A17]/5 px-2">CELLULOID CLUB</span> IS A COLLECTIVE OF FILMMAKERS, CINEMATOGRAPHERS, AND STORYTELLERS UNITED BY A DEEP OBSESSION WITH THE FRAME.
          </p>
        </div>

        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-50 animate-pulse">
          <span className="font-[family-name:var(--font-oswald)] text-sm tracking-[0.3em] uppercase">Scroll</span>
          <div className="h-12 w-[1px] bg-[#1C1A17]" />
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-24 px-4 relative perspective-1000 z-10">
        <div className="max-w-4xl mx-auto border border-[#1C1A17]/20 p-8 md:p-16 relative bg-[#F9F1E1] shadow-[10px_10px_20px_rgba(0,0,0,0.2)] transform -rotate-1 hover:rotate-0 transition-all duration-700 ease-out z-10">
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
          <div className="absolute -left-3 top-4 bottom-4 w-6 flex flex-col justify-between py-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-5 h-5 rounded-full bg-[#333] shadow-inner ring-1 ring-[#F9F1E1]" />
            ))}
          </div>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl uppercase tracking-widest mb-8 text-[#8B2E2E] border-b-2 border-[#1C1A17] pb-4 w-fit">
            Manifesto // Scene 1
          </h2>
          <div className="font-[family-name:var(--font-courier)] text-lg md:text-xl leading-relaxed space-y-6 text-[#1C1A17]">
            <p>
              <span className="font-bold uppercase tracking-wider bg-black text-white px-1 mr-2">EXT. DAY.</span> 
              We believe filmmaking is not just about cameras and cuts. It is about intention.
            </p>
            <p>
              From concept to cut, from sound to silence, cinema demands honesty and precision. We reject the generic. We embrace the grain.
            </p>
            <p className="pt-8 font-bold text-[#8B2E2E] text-2xl text-center italic">
              “We collaborate. We experiment. We record.”
            </p>
          </div>
        </div>
      </section>

      {/* MEMBERS */}
      <section className="py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-[family-name:var(--font-oswald)] text-5xl md:text-6xl uppercase tracking-tight relative inline-block">
              The Team
              <span className="absolute -top-6 -right-6 text-sm font-[family-name:var(--font-courier)] text-[#8B2E2E] rotate-12 border border-[#8B2E2E] px-2 py-1">SEASON 01</span>
            </h2>
            <p className="font-[family-name:var(--font-courier)] mt-4 text-sm tracking-widest uppercase opacity-60">Production Unit 01</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { role: "---", name: "yathin girish kumar" },
              { role: "-----", name: "Kishan" },
              { role: "--", name: "Raoul" },
            ].map((member, index) => (
              <div key={index} className="group relative transition-all duration-500 hover:-translate-y-4 hover:rotate-1">
                <div className="bg-[#151515] p-2 pb-12 relative shadow-2xl overflow-hidden">
                  <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-between py-1 gap-1 z-20">
                    {[...Array(8)].map((_, i) => <div key={i} className="w-4 h-5 bg-[#EAD7B0] rounded-[2px] opacity-90" />)}
                  </div>
                  <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-between py-1 gap-1 z-20">
                    {[...Array(8)].map((_, i) => <div key={i} className="w-4 h-5 bg-[#EAD7B0] rounded-[2px] opacity-90" />)}
                  </div>
                  <div className="mx-8 mt-4 bg-[#2a2a2a] aspect-[3/4] relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
                    <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                      <span className="font-[family-name:var(--font-oswald)] text-8xl text-white/5 group-hover:text-white/20 transition-all">IMG</span>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        <span className="text-[10px] font-[family-name:var(--font-courier)] text-red-600 font-bold tracking-widest">REC</span>
                    </div>
                  </div>
                  <div className="text-center px-8 mt-6 relative z-20">
                    <h3 className="font-[family-name:var(--font-oswald)] text-2xl uppercase text-[#F5E6C8] tracking-widest group-hover:text-[#8B2E2E] transition-colors">
                      {member.name}
                    </h3>
                    <div className="h-[1px] w-full bg-white/20 my-2" />
                    <p className="font-[family-name:var(--font-courier)] text-xs text-white/50 uppercase tracking-[0.2em]">
                      // {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BACK BUTTON */}
      <div className="flex justify-center pb-24 pt-12 relative z-20">
         <div className="w-full max-w-[250px]">
            <TicketButton text="Back Home" number="000" href="/" />
         </div>
      </div>

      <style jsx global>{`
        @keyframes flicker { 0% { opacity: 0.25; } 5% { opacity: 0.3; } 10% { opacity: 0.25; } 15% { opacity: 0.35; } 20% { opacity: 0.25; } 100% { opacity: 0.25; } }
        .animate-flicker { animation: flicker 4s infinite; }
        @keyframes beam-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-beam-rotate { animation: beam-rotate 20s linear infinite; }
        @keyframes scratch-jitter { 0% { transform: translateX(0); } 50% { transform: translateX(-1px); } 100% { transform: translateX(0); } }
        .animate-scratch-jitter { animation: scratch-jitter 0.5s steps(10) infinite; }
        @keyframes bulb-on { 0% { opacity: 0; filter: blur(2px);} 30% { opacity: 0.8; filter: blur(0px); } 40% { opacity: 0.6; filter: blur(1px); } 100% { opacity: 1; filter: blur(0px); } }
        .animate-bulb-on { animation: bulb-on 1.5s ease-out forwards; }
      `}</style>
    </main>
  );
}