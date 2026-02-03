"use client";

import Image from "next/image";
import Link from "next/link";
import { Oswald, Courier_Prime } from "next/font/google";
import { useEffect, useRef, useState } from "react";

// ================= FONT SETUP =================
const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-oswald" });
const courier = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-courier" });

export default function LeadOfLeads() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [hasStarted, setHasStarted] = useState(false);
  const [sirenMode, setSirenMode] = useState(false);
  const [isRewinding, setIsRewinding] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

  // 1. START PLAYBACK
  const handleStart = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setHasStarted(true);
    }
  };

  // 2. MONITOR VIDEO TIME
  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid) return;

    const timeLeft = vid.duration - vid.currentTime;

    // Trigger Siren 10s before end
    if (timeLeft <= 10 && !sirenMode && !isRewinding) {
      setSirenMode(true);
      if (audioRef.current) {
        audioRef.current.volume = 1.0; // MAX VOLUME
        audioRef.current.play();
      }
    }

    // Trigger Rewind at end
    if (timeLeft <= 0.5 && !isRewinding) {
      triggerRewind();
    }
  };

  // 3. REWIND LOGIC
  const triggerRewind = () => {
    const vid = videoRef.current;
    if (!vid) return;

    setIsRewinding(true);
    vid.pause();

    // Fast rewind loop
    const rewindInterval = setInterval(() => {
      if (vid.currentTime > 0.5) {
        vid.currentTime -= 2.0; // Jump back 2 seconds per tick (Very Fast)
      } else {
        // Rewind Complete
        clearInterval(rewindInterval);
        vid.currentTime = 0;
        setShowReveal(true); // POP UP PHOTO
      }
    }, 50); // Run every 50ms
  };

  return (
    <div className={`min-h-screen bg-black relative overflow-hidden ${oswald.variable} ${courier.variable}`}>
      
      {/* ================= AUDIO ELEMENT ================= */}
      <audio ref={audioRef} src="/assets/siren.mp3" loop />

      {/* ================= SIREN OVERLAY (RED/BLUE STROBE) ================= */}
      <div 
        className={`fixed inset-0 z-40 pointer-events-none mix-blend-overlay transition-opacity duration-100 ${
          sirenMode ? "opacity-100 animate-police-strobe" : "opacity-0"
        }`}
      >
         <div className="absolute inset-0 bg-red-600/50 mix-blend-color-dodge"></div>
      </div>

      {/* ================= VIDEO PLAYER ================= */}
      <div className="relative w-full h-screen flex items-center justify-center bg-black">
        
        {/* Start Button Overlay */}
        {!hasStarted && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer" onClick={handleStart}>
            <div className="border-2 border-[#8B2E2E] p-8 text-center animate-pulse hover:bg-[#8B2E2E]/10 transition-colors">
               <h1 className="font-[family-name:var(--font-oswald)] text-4xl text-[#EAD7B0] uppercase tracking-widest">
                 CONFIDENTIAL FOOTAGE
               </h1>
               <p className="font-[family-name:var(--font-courier)] text-red-500 mt-2">
                 [ CLICK TO DECRYPT ]
               </p>
            </div>
          </div>
        )}

        {/* The Video */}
        <video 
          ref={videoRef}
          src="/assets/video.mp4"
          className={`w-full h-full object-cover transition-all duration-300 ${isRewinding ? 'grayscale blur-sm opacity-50' : ''}`}
          onTimeUpdate={handleTimeUpdate}
          onEnded={triggerRewind}
          playsInline
        />

        {/* Rewind UI Overlay */}
        {isRewinding && (
             <div className="absolute inset-0 z-30 flex items-center justify-center">
                 {/* ▼▼▼ FIXED LINE IS HERE ▼▼▼ */}
                 <p className="font-[family-name:var(--font-courier)] text-6xl text-[#EAD7B0] font-bold tracking-[1em] animate-pulse">
                    &lt;&lt; REWINDING &lt;&lt;
                 </p>
             </div>
        )}
      </div>

      {/* ================= THE REVEAL (POP UP) ================= */}
      {showReveal && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 animate-jump-scare">
           
           {/* Crazy Background Text */}
           <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
              <div className="w-full h-full flex flex-wrap content-center justify-center gap-4 animate-shake">
                  {Array(50).fill("LEAD OF LEADS").map((_, i) => (
                      <span key={i} className="font-[family-name:var(--font-oswald)] text-red-600 text-6xl font-bold uppercase">LEAD OF LEADS</span>
                  ))}
              </div>
           </div>

           {/* The Photo */}
           <div className="relative w-[300px] md:w-[500px] aspect-square animate-slam">
              {/* Spinning decorative ring */}
              <div className="absolute -inset-10 border-4 border-dashed border-red-600 rounded-full animate-spin-slow"></div>
              
              <Image 
                src="/assets/me.png" 
                alt="Me" 
                fill 
                className="object-cover border-4 border-[#EAD7B0] shadow-[0_0_50px_rgba(255,0,0,0.8)]"
              />
              
              {/* "TARGET" Overlay */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-8 py-2 font-[family-name:var(--font-oswald)] text-3xl lowercase tracking-widest whitespace-nowrap rotate-[-2deg]">
               he made ts btw
              </div>
           </div>

            {/* Back Button */}
            <div className="mt-20 relative z-50">
                <Link href="/" className="px-8 py-3 border border-[#EAD7B0] text-[#EAD7B0] font-[family-name:var(--font-courier)] hover:bg-[#EAD7B0] hover:text-black transition-all">
                    EXIT SIMULATION
                </Link>
            </div>
        </div>
      )}

      {/* ================= CUSTOM ANIMATIONS ================= */}
      <style jsx global>{`
        @keyframes police-strobe {
          0% { background-color: rgba(255, 0, 0, 0.5); }
          25% { background-color: rgba(255, 0, 0, 0); }
          50% { background-color: rgba(0, 0, 255, 0.5); }
          75% { background-color: rgba(0, 0, 255, 0); }
          100% { background-color: rgba(255, 0, 0, 0.5); }
        }
        .animate-police-strobe {
          animation: police-strobe 0.5s steps(1) infinite;
        }

        @keyframes slam {
          0% { transform: scale(5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-slam {
            animation: slam 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes shake {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); }
            30% { transform: translate(3px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            60% { transform: translate(-3px, 1px) rotate(0deg); }
            70% { transform: translate(3px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .animate-shake {
            animation: shake 0.5s infinite;
        }
      `}</style>

    </div>
  );
}