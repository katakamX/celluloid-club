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
