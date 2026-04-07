import type { Metadata } from "next";
import "./globals.css";
import { Oswald, Courier_Prime } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const courier = Courier_Prime({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-courier",
});

// ▼▼▼ ADDED METADATA BLOCK ▼▼▼
export const metadata: Metadata = {
  title: "Celluloid Club",
  description: "A collective of filmmakers, cinematographers, and storytellers. Show, don't tell.",
  icons: {
    icon: "/transparent_upscaled.png", // This makes your logo appear in the browser tab
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${courier.variable}`}>
      <body>{children}</body>
    </html>
  );
}