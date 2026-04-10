import type { Metadata } from "next";
import { clashDisplay, switzer } from "@/lib/fonts";
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
      <body>{children}</body>
    </html>
  );
}
