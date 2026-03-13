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

// ================= TEAM DATA =================
const teamMembers = [
  { role: "Mentor", name: "Aravind KS", image: "/team/aravind.jpg" },
  { role: "Lead", name: "Yathin Girish", image: "/team/Yathin Girish.jpeg" },
  { role: "Co-Lead", name: "Kishan Thayil", image: "/team/kishan.jpg" },
  { role: "Lead of leads", name: "Adithya Katakam", image: "/team/aditya.jpg" },
  { role: "Production Support & Admin", name: "Darin Raoul John", image: "/team/darin.jpeg" },
  { role: "Cinematographer", name: "Vishwajith Pradosh Kumar", image: "/team/vishwajit.jpg" },
  { role: "Writer & Production Support", name: "Nayab Ali", image: "/team/nayab.jpg" },
  { role: "Music", name: "Alenchristo Joby", image: "/team/alenchristo.jpeg" },
  { role: "Actor & Production Support", name: "Rohith Sreekumar", image: "/team/rohith.jpeg" },
  { role: "Production Support", name: "Brayon Tomy", image: "/team/brayon.jpeg" },
  { role: "Production Support", name: "Chetan", image: "/team/chetan.jpeg" },
  { role: "Cinematographer", name: "Bhavan", image: "/team/bhavan.jpeg" },
  { role: "Logistics", name: "Suriya", image: "/team/suriya.jpg" },
  { role: "Logistics", name: "Krithick", image: "/team/krithick.jpg" },
  { role: "Production Support", name: "Dinishita", image: "/team/dinishita.jpg" },
  { role: "Actor", name: "Harshith", image: "/team/harshith.jpeg" },
  { role: "Actor", name: "Dikshita", image: "/team/dikshita.jpg" },
  { role: "Actor", name: "Aditi", image: "/team/aditi.jpg" },
  { role: "Actor", name: "Sanuj Satish Kumar", image: "/team/sanuj.jpeg" },
  { role: "Actor", name: "Vaibhav Jain", image: "/team/vaibhav.jpeg" },
  { role: "Actor", name: "Divyanshu", image: "/team/divyanshu.jpg" },
  { role: "Actor", name: "Sanidhi", image: "/team/sanidhi.jpeg" },
  { role: "Direction", name: "Vishal Tejas", image: "/team/vishal.jpeg" },
  { role: "Content Writing", name: "Mani Pushpam", image: "/team/mani.jpeg" },
  { role: "Actor", name: "Vishal Mani", image: "/team/vishaal.jpeg" },
  { role: "Sound design", name: "Rohan", image: "/team/rohan.jpg" },
  { role: "Writer", name: "Palakh Kaushal", image: "/team/palakh.png" },
  { role: "Writer", name: "Prit Thacker", image: "/team/prit.jpeg" },
  { role: "Writer", name: "V Krishna Kishore", image: "/team/krishna.jpg" },
  { role: "Writer", name: "S Dhanush Babu", image: "/team/dhanush.jpeg" },
  { role: "Writer", name: "J Santosh", image: "/team/santosh.jpg" },
  { role: "Editor", name: "Sukrut Kulkarni", image: "/team/sukrut.jpeg" },
  { role: "Actor", name: "Pushkar", image: "/team/pushkar.jpg" },
  { role: "Editing", name: "Safwan", image: "/team/safwan.jpeg" },
  { role: "Editing", name: "Ronan", image: "/team/ronan.PNG" },
  { role: "Editing", name: "Shaik", image: "/team/Shaik Mohammed.jpeg" },
  { role: "Writer", name: "Rithika pappa", image: "/team/rithika.jpg" },
  { role: "Writer", name: "Sanchita Singh", image: "/team/sanchita.jpg" },
  { role: "Writer", name: "Julika ranjan", image: "/team/julika.jpg" },
  { role: "Writer", name: "Nikhil Sunil", image: "/team/nikhil.jpeg" },
  { role: "Writer", name: "Kashish Singh", image: "/team/kashish.jpeg" },
  { role: "Writer", name: "Sai sahasra", image: "/team/Sai Sahasra Vaibhavi.jpeg" },
  { role: "Cinematographer", name: "Haresh", image: "/team/haresh.jpeg" },
  { role: "Cinematographer", name: "Praveen Kumar N", image: "/team/praveen.jpeg" },
];

// ================= COMPONENT: TICKET BUTTON =================
const TicketButton = ({ text, number, href, isPrimary = false, onClick }: any) => {
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
  } as React.CSSProperties;

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
const WanderingIcon = ({ children, onCapture, isInteractive = false }: any) => {
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
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
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

      {/* ================= ATMOSPHERIC LAYERS ================= */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#F5E6C8] via-[#EAD7B0] to-[#C8B085] -z-30" />
      <div className="fixed inset-0 opacity-20 pointer-events-none mix-blend-multiply -z-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div className="fixed inset-0 pointer-events-none -z-18 mix-blend-soft-light opacity-40 animate-beam-rotate overflow-hidden"><div className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_45%,rgba(255,245,220,0.3)_50%,transparent_55%)]"></div></div>
      <div className="fixed inset-0 pointer-events-none -z-16 mix-blend-overlay opacity-30 animate-scratch-jitter"><div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_50px,rgba(0,0,0,0.2)_50px,rgba(0,0,0,0.2)_51px)] scale-[2]"></div></div>
      <div className="fixed inset-0 pointer-events-none -z-15 animate-flicker mix-blend-overlay opacity-30 bg-[url('https://www.transparenttextures.com/patterns/dust.png')]"></div>
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
              <span className="font-bold uppercase tracking-wider bg-[#1C1A17] text-[#EAD7B0] px-1 mr-2">EXT. DAY.</span> 
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

      {/* ROLLING CREDITS (FLEXBOX FIX APPLIED) */}
      <section className="py-32 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-oswald)] text-5xl md:text-6xl uppercase tracking-tight relative inline-block">
              Crew Roster
              <span className="absolute -top-6 -right-6 text-sm font-[family-name:var(--font-courier)] text-[#8B2E2E] rotate-12 border border-[#8B2E2E] px-2 py-1">SEASON 01</span>
            </h2>
            <p className="font-[family-name:var(--font-courier)] mt-4 text-sm tracking-widest uppercase opacity-60">Production Unit 01</p>
          </div>

          {/* Grid: credits left, film strip right */}
          <div className="flex gap-8 items-start justify-center">
            
            {/* CREDITS SCROLL */}
            <div className="w-full max-w-[600px] shrink-0">
              <div className="relative h-[min(60vh,500px)] overflow-hidden mask-image-fade group">
                <div className="absolute top-0 left-0 w-full flex flex-col gap-6 pb-[500px] animate-credits-roll group-hover:[animation-play-state:paused]">
                  {teamMembers.map((person, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredImage(person.image)}
                      onMouseLeave={() => setHoveredImage(null)}
                      className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[#1C1A17]/20 pb-4 cursor-crosshair transition-colors duration-300 hover:border-[#8B2E2E]"
                    >
                      <span className="font-[family-name:var(--font-courier)] text-xs md:text-sm text-[#1C1A17]/60 uppercase tracking-widest w-1/2 mb-1 md:mb-0 transition-colors duration-300 group-hover:text-[#8B2E2E] text-left">
                        {person.role || "---"}
                      </span>
                      <span className="font-[family-name:var(--font-oswald)] text-xl md:text-3xl uppercase tracking-wider text-[#1C1A17] transition-colors duration-300 group-hover:text-[#8B2E2E] text-right">
                        {person.name}
                      </span>
                    </div>
                  ))}
                  <div className="text-center mt-24 text-[#1C1A17]/50 font-[family-name:var(--font-courier)] text-sm tracking-widest uppercase">
                    ❖ End of Roster
                  </div>
                </div>
              </div>
            </div>

            {/* FILM STRIP - sits in its own column, never overlaps */}
            <div className="hidden lg:block shrink-0 sticky top-1/4">
              <div
                style={{ width: '220px', height: '380px' }}
                className={`relative overflow-hidden bg-[#111] shadow-2xl transition-all duration-700 ease-out transform ${
                  hoveredImage ? "opacity-100 scale-100 rotate-1" : "opacity-0 scale-95 -rotate-2 pointer-events-none"
                }`}
              >
                {/* Left Sprocket Holes */}
                <div className="absolute left-2 top-3 bottom-3 flex flex-col justify-between z-20">
                  {[...Array(10)].map((_, i) => (
                    <div key={`left-${i}`} className="w-2.5 h-3.5 bg-[#EAD7B0]/30 rounded-[1px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]" />
                  ))}
                </div>
                {/* Right Sprocket Holes */}
                <div className="absolute right-2 top-3 bottom-3 flex flex-col justify-between z-20">
                  {[...Array(10)].map((_, i) => (
                    <div key={`right-${i}`} className="w-2.5 h-3.5 bg-[#EAD7B0]/30 rounded-[1px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]" />
                  ))}
                </div>
                {/* Image */}
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '28px', right: '28px' }}>
                  {hoveredImage && (
                    <img
                      src={hoveredImage}
                      alt="Crew Member"
                      className="object-cover w-full h-full grayscale contrast-125 brightness-90 opacity-90"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop&grayscale=true";
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-[#EAD7B0]/10 mix-blend-multiply border-x border-[#1C1A17]/50 pointer-events-none" />
                </div>
              </div>
            </div>

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
        
        /* Credits Roll Animations */
        .mask-image-fade {
          mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        }
        
        /* Container-relative movement (%) starting exactly at 500px to fix delay */
        @keyframes creditsRoll {
          0% { transform: translateY(500px); }
          100% { transform: translateY(-100%); }
        }
        .animate-credits-roll {
          animation: creditsRoll 60s linear infinite;
        }
      `}</style>
    </main>
  );
}