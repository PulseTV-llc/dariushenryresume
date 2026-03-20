import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Darius Henry | Full-Stack Developer",
  description: "Full-stack developer specializing in SaaS applications, AI integration, and modern web & mobile development. Creator of Zonely, Speakix, TapeCoach, and more.",
  keywords: ["Full-Stack Developer", "SaaS", "AI", "React", "Next.js", "SwiftUI", "iOS", "TypeScript", "Firebase"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
