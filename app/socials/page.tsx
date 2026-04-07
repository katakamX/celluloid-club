"use client";

import Link from "next/link";
import { Oswald, Courier_Prime } from "next/font/google";
import { FaInstagram, FaYoutube } from "react-icons/fa";
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

// ================= DATA =================
const socialLinks = [
  {
    platform: "Instagram",
    label: "Visual Archives",
    url: "https://www.instagram.com/clubcelluloid/",
    ticketNo: "No. 00142",
    icon: <FaInstagram />,
  },
  {
    platform: "YouTube",
    label: "The Theatre",
    url: "https://www.youtube.com/@CelluloidClub",
    ticketNo: "No. 12095",
    icon: <FaYoutube />,
  },
];

export default function SocialsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      className={`min-h-screen relative overflow-hidden transition-opacity duration-700 ${
        mounted ? "opacity-100" : "opacity-0"
      } ${oswald.variable} ${courier.variable}`}
    >
      {/* ================= TEXTURE ================= */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#F5E6C8] via-[#EAD7B0] to-[#C8B085] -z-30" />
      <div
        className="fixed inset-0 opacity-15 pointer-events-none mix-blend-multiply -z-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)] pointer-events-none -z-10" />

      {/* ================= CONTENT ================= */}
      <div className="min-h-screen flex flex-col items-center justify-center py-24 px-4 text-[#1C1A17]">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="font-[family-name:var(--font-oswald)] text-5xl md:text-7xl uppercase tracking-tighter">
            Now Playing
          </h1>
          <p className="font-[family-name:var(--font-courier)] mt-4 text-sm tracking-[0.3em] uppercase opacity-70">
            Find us on these channels
          </p>
        </header>

        {/* ================= TICKETS ================= */}
        <div className="w-full max-w-md space-y-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2E2E]"
            >
              <div className="relative h-32 bg-[#1C1A17] text-[#EAD7B0] flex transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-[-0.6deg] shadow-[8px_8px_0px_rgba(0,0,0,0.3)] group-hover:shadow-[8px_8px_0px_rgba(139,46,46,1)]">
                
                {/* Tear-off edge */}
                <div
                  className="absolute inset-y-0 right-0 w-3 bg-[#EAD7B0] opacity-20"
                  style={{
                    clipPath:
                      "polygon(0 0,100% 5%,100% 95%,0 100%)",
                  }}
                />

                {/* Stub */}
                <div className="w-20 border-r-2 border-dashed border-[#EAD7B0]/30 flex items-center justify-center">
                  <span className="font-[family-name:var(--font-oswald)] uppercase tracking-widest -rotate-90 text-xs opacity-60">
                    Admit One
                  </span>
                </div>

                {/* Main */}
                <div className="flex-1 p-6 relative overflow-hidden">
                  {/* Light leak */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8B2E2E] to-transparent opacity-0 group-hover:opacity-40 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700" />

                  <div className="relative z-10 flex justify-between items-end h-full">
                    <div>
                      <h2 className="font-[family-name:var(--font-oswald)] text-3xl uppercase">
                        {link.platform}
                      </h2>
                      <p className="font-[family-name:var(--font-courier)] text-xs uppercase tracking-widest opacity-80">
                        // {link.label}
                      </p>
                    </div>

                    <div className="text-3xl opacity-20 group-hover:opacity-70 transition-opacity">
                      {link.icon}
                    </div>
                  </div>

                  <span className="absolute top-2 right-4 text-[10px] opacity-40 font-[family-name:var(--font-courier)]">
                    {link.ticketNo}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20">
          <Link
            href="/"
            className="font-[family-name:var(--font-oswald)] text-sm tracking-[0.3em] uppercase border-b border-transparent hover:border-[#1C1A17] transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
