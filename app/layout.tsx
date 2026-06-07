import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARCLANE GLOBAL — Intelligent Solutions. Global Impact.",
  description:
    "ARCLANE GLOBAL — Engineering next-generation AI ecosystems, cloud infrastructure, and premium digital experiences. A futuristic AI operating system for the modern enterprise.",
  keywords: [
    "AI ecosystem",
    "cloud infrastructure",
    "enterprise AI",
    "ERP",
    "premium branding",
    "futuristic web development",
  ],
};

export const viewport: Viewport = {
  themeColor: "#020205",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-white antialiased">{children}</body>
    </html>
  );
}
