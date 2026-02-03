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

// ================= COMPONENT: DIRECTOR CREDIT (TEXT ONLY) =================
const DirectorCredit = () => {
  return (
    // pointer-events-none ensures you can't click it, it's just a visual layer
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none select-none mix-blend-multiply">
       <span className="font-[family-name:var(--font-courier)] text-[10px] tracking-[0.2em] uppercase text-[#1C1A17] opacity-40">
          WEBSITE BY ADITYA KATAKAM
       </span>
    </div>
  );
};

// ================= COMPONENT: GENERIC WANDERING ICON =================
const WanderingIcon = ({ children, onCapture, isInteractive = false }) => {
  const [position, setPosition] = useState({ 
    x: typeof window !== 'undefined' ? Math.random() * (window.innerWidth - 100) : 50, 
    y: typeof window !== 'undefined' ? Math.random() * (window.innerHeight - 100) : 50, 
    rotation: Math.random() * 360 
  });
  
  useEffect(() => {
    const moveIcon = () => {
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;
      
      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;
      const newRot = isInteractive ? Math.random() * 60 - 30 : Math.random() * 360; 

      setPosition({ x: newX, y: newY, rotation: newRot });
    };

    const intervalTime = isInteractive ? 2500 : 3000 + Math.random() * 1000;
    
    const initialTimeout = setTimeout(() => {
       moveIcon();
       const interval = setInterval(moveIcon, intervalTime);
       return () => clearInterval(interval);
    }, Math.random() * 1000);

    return () => clearTimeout(initialTimeout);
  }, [isInteractive]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (isInteractive && onCapture) onCapture();
      }}
      className={`fixed transition-all ease-in-out hover:scale-110 
        ${isInteractive 
          ? 'z-50 cursor-crosshair opacity-100 duration-[2500ms]' 
          : 'z-30 cursor-default opacity-60 hover:opacity-80 duration-[4000ms]'
        }`}
      style={{
        left: position.x,
        top: position.y,
        transform: `rotate(${position.rotation}deg)`,
      }}
    >
      {children}
      {isInteractive && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_5px_rgba(220,38,38,1)]" />
      )}
    </div>
  );
};

// ================= MAIN COMPONENT =================
export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCameraClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push("/lead-of-leads");
    }, 1200);
  };

  const svgProps = {
    width: "48", height: "48", viewBox: "0 0 24 24", fill: "none",
    stroke: "#1C1A17", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round",
    className: "drop-shadow-lg"
  };

  return (
    <main className={`min-h-screen relative overflow-hidden ${oswald.variable} ${courier.variable}`}>
      
      {/* ================= CREDIT STAMP ================= */}
      <DirectorCredit />

      {/* Transition Overlay */}
      <div 
        className={`fixed inset-0 bg-[#1C1A17] z-[100] pointer-events-none transition-all duration-[1200ms] ease-in-out`}
        style={{ clipPath: isTransitioning ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)" }}
      >
        <div className={`absolute inset-0 flex items-center justify-center opacity-0 ${isTransitioning ? 'opacity-100 delay-500' : ''} transition-opacity`}>
             <h2 className="text-[#EAD7B0] font-[family-name:var(--font-courier)] tracking-widest text-xl animate-pulse">LOADING PAGE...</h2>
        </div>
      </div>

      {/* ================= WANDERING ICONS ================= */}
      {mounted && !isTransitioning && (
        <>
          {/* 1. The Interactive Camera (Triggers transition) */}
          <WanderingIcon isInteractive={true} onCapture={handleCameraClick}>
            <svg {...svgProps} className={`${svgProps.className} fill-[#EAD7B0]`}>
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </WanderingIcon>

          {/* 2. The Passive Film Reel (Decorative) */}
          <WanderingIcon isInteractive={false}>
            <svg {...svgProps}>
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.1 2.1m10 10l2.1 2.1M4.9 19.1l2.1-2.1m10-10l2.1-2.1" />
            </svg>
          </WanderingIcon>

          {/* 3. The Passive Director's Chair (Decorative) */}
          <WanderingIcon isInteractive={false}>
            <svg {...svgProps}>
               <path d="M5 12h14" />
               <path d="M5 12l4-8h6l4 8" />
               <path d="M5 21l7-9 7 9" />
               <path d="M5 21h14" />
            </svg>
          </WanderingIcon>
        </>
      )}

      {/* ================= BACKGROUNDS ================= */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#F5E6C8] via-[#EAD7B0] to-[#C8B085] -z-30" />
      <div className="fixed inset-0 opacity-20 pointer-events-none mix-blend-multiply -z-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} />
      <div className="fixed inset-0 pointer-events-none -z-18 mix-blend-soft-light opacity-40 animate-beam-rotate overflow-hidden"><div className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_45%,rgba(255,245,220,0.3)_50%,transparent_55%)]"></div></div>
      <div className="fixed inset-0 pointer-events-none -z-16 mix-blend-overlay opacity-30 animate-scratch-jitter"><div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_50px,rgba(0,0,0,0.2)_50px,rgba(0,0,0,0.2)_51px)] scale-[2]"></div></div>
      <div className="fixed inset-0 pointer-events-none -z-15 animate-flicker mix-blend-overlay opacity-30 bg-[url('https://www.transparenttextures.com/patterns/dust.png')]"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(10,5,0,0.5)_120%)] pointer-events-none -z-10" />

      {/* ================= HERO CONTENT ================= */}
      <section className={`min-h-screen flex flex-col items-center justify-center text-center px-6 relative z-10 transition-opacity duration-1000 delay-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
        <div className="mb-10 relative animate-float-slow">
          <div className="absolute inset-0 bg-[#EAD7B0] blur-3xl opacity-50 rounded-full transform scale-150" />
          <Image src="/logo.png" alt="Celluloid Club Logo" width={160} height={160} className="mx-auto relative drop-shadow-xl grayscale-0 hover:grayscale transition-all duration-500" priority />
        </div>
        <h1 className={`font-[family-name:var(--font-oswald)] text-6xl md:text-8xl tracking-[0.2em] uppercase text-[#1C1A17] mb-6 relative select-none ${mounted ? 'animate-bulb-on' : 'opacity-0'}`}>
          <span className="relative z-10 mix-blend-hard-light">Celluloid Club</span>
          <span className="absolute inset-0 text-[#1C1A17] opacity-20 blur-[1px] select-none">Celluloid Club</span>
        </h1>
        <div className="flex items-center gap-4 mb-8 opacity-60">
            <div className="w-12 h-[1px] bg-[#1C1A17]" />
            <span className="text-xl">❖</span>
            <div className="w-12 h-[1px] bg-[#1C1A17]" />
        </div>
        <p className="font-[family-name:var(--font-courier)] text-sm md:text-lg italic tracking-[0.15em] text-[#3a3530] mb-16 max-w-md leading-relaxed">
          “show, don’t tell”
        </p>
        <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-4xl justify-center">
          <div className="w-full md:w-auto min-w-[200px]"><TicketButton text="Socials" number="084" href="/socials" /></div>
          <div className="w-full md:w-auto min-w-[240px] transform scale-110 md:mx-4 z-10"><TicketButton text="Watch Now" number="001" isPrimary={true} /></div>
          <div className="w-full md:w-auto min-w-[200px]"><TicketButton text="About Us" number="092" href="/about" /></div>
        </div>
      </section>

      {/* ================= GLOBAL ANIMATIONS ================= */}
      <style jsx global>{`
        @keyframes flicker { 0% { opacity: 0.25; } 5% { opacity: 0.3; } 10% { opacity: 0.25; } 15% { opacity: 0.35; } 20% { opacity: 0.25; } 100% { opacity: 0.25; } }
        .animate-flicker { animation: flicker 4s infinite; }
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
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