import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jenesis Global — Omni-Channel Revenue Engine",
  description:
    "We help brands grow revenue through an omni-channel approach. Uniting Performance Marketing, Web & App Engineering, Enterprise AI Systems, and Search Engine Dominance.",
  keywords: [
    "Jenesis Global",
    "Omni-Channel Revenue Engine",
    "Performance Marketing",
    "Web & App Engineering",
    "Enterprise AI Systems",
    "SEO AEO Optimization",
  ],
};

export const viewport: Viewport = {
  themeColor: "#050507",
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
      <body className="bg-[#050507] text-white antialiased selection:bg-[#ff1744] selection:text-white">
        {children}
      </body>
    </html>
  );
}
