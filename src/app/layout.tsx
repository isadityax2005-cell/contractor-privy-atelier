import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Instrument_Serif, Figtree } from "next/font/google";
import "./globals.css";

// Free stand-ins for Sobha Privy's TT Ramillas (display caps), Altesse (flowing accent) and TT Commons (UI sans).
const head = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-head", display: "swap" });
const accent = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-accent", display: "swap" });
const ui = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-ui", display: "swap" });

export const metadata: Metadata = {
  title: "Atelier Privé — The Art of Permanence",
  description: "A handpicked collection of the rarest private estates, designed and built as one. Bespoke architecture, master design-build and private estates in Dubai, London, Zürich and Los Angeles.",
  openGraph: { title: "Atelier Privé — The Art of Permanence", description: "Architecture built to outlast its architects.", type: "website" },
};
export const viewport: Viewport = { themeColor: "#1a1919" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${head.variable} ${accent.variable} ${ui.variable} is-loading`}>
      <body>{children}</body>
    </html>
  );
}
