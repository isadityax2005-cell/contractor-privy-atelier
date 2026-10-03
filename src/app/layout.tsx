import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Luxury Custom Home Builders & Structural Remodeling`,
  description: siteConfig.hero.subtitle,
  keywords: [
    "luxury home contractor",
    "architectural builder",
    "structural remodel",
    "custom estate construction",
    "Austin custom home builder",
    "high-end residential construction",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
