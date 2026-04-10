import type { Metadata } from "next";
import { clashDisplay, switzer } from "@/lib/fonts";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mahdeen Reza | Systems Governance & AI",
  description:
    "Portfolio of Mahdeen Reza — Systems Governance Analyst specializing in AI, SaaS management, automation, and compliance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${switzer.variable}`}
    >
      <body>
        <Preloader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
