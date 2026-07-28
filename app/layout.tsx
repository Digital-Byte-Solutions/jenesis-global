import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jenesis Global — We Help Brands Grow Revenue Through an Omni-Channel Approach",
  description:
    "We help brands grow revenue through an omni-channel approach — uniting Performance Marketing, Web & App Engineering, Enterprise AI Systems, and Search Engine Dominance into one connected engine.",
  keywords: [
    "Jenesis Global",
    "Omni-channel growth engine",
    "Brand revenue growth",
    "Performance marketing",
    "Web engineering",
    "Enterprise AI workflows",
    "AEO SEO dominance",
  ],
  openGraph: {
    title: "Jenesis Global — We Help Brands Grow Revenue Through an Omni-Channel Approach",
    description:
      "We help brands grow revenue through an omni-channel approach. One connected growth engine built for measurable ROI.",
    type: "website",
    siteName: "Jenesis Global",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jenesis Global — We Help Brands Grow Revenue Through an Omni-Channel Approach",
    description:
      "We help brands grow revenue through an omni-channel approach. One connected growth engine built for measurable ROI.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
};

// Dark is the brand default; light applies only when explicitly chosen.
// Runs before first paint — no flash of wrong theme.
const themeInit = `try{if(localStorage.getItem("theme")!=="light")document.documentElement.classList.add("dark")}catch(e){document.documentElement.classList.add("dark")}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Jenesis Global",
    "url": "https://jenesis.global",
    "description": "We help brands grow revenue through an omni-channel approach.",
    "slogan": "We help brands grow revenue through an omni-channel approach.",
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
