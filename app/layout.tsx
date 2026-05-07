import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Dragon from "./components/Dragon";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ReignDragon Lab",
    template: "%s | ReignDragon Lab",
  },
  description:
    "ReignDragon Lab studies how intelligent agents fail together. We build the science, benchmarks, and governance levers for AI workforces operating inside companies, markets, governments, and platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased noise-overlay`}
      >
        <Navigation />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <Dragon />
      </body>
    </html>
  );
}
