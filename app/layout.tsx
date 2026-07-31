import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jenesis Global — We Help Brands Grow Revenue Through an Omni-Channel Approach",
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
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ef",
  width: "device-width",
  initialScale: 1,
};

/* Immediately apply light theme class to avoid FOUC */
const themeInit = `try{
  var t=localStorage.getItem('jg-theme')||'light';
  document.documentElement.classList.add(t);
}catch(e){document.documentElement.classList.add('light')}`;

import CinematicGrain from "@/components/CinematicGrain";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <CinematicGrain />
        {children}
      </body>
    </html>
  );
}
