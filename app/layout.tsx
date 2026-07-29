import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JENESIS GLOBAL // Autonomous Engine & Strategic Advisory",
  description:
    "Jenesis Global — Architecting high-stakes digital ecosystems, enterprise AI infrastructure, and next-generation capital strategies at the intersection of Strategy, AI, and Capital.",
  keywords: [
    "Jenesis Global",
    "WebGL",
    "Igloo Inc Clone",
    "AI Systems",
    "Strategic Advisory",
    "Venture Capital",
    "Enterprise Infrastructure",
  ],
};

export const viewport: Viewport = {
  themeColor: "#07090e",
  width: "device-width",
  initialScale: 1,
};

const themeInit = `try{document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark font-mono">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="bg-[#07090e] text-white antialiased selection:bg-[#00f0ff] selection:text-black">
        {children}
      </body>
    </html>
  );
}
