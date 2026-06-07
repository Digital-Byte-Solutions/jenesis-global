import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050507",
        "bg-elevated": "#0a0a0f",
        accent: {
          DEFAULT: "#ff2d55",
          soft: "#ff4d8d",
          glow: "#ff6b9d",
          deep: "#d10037",
        },
        // Legacy compatibility — keep arc-* working for any leftover usage
        "arc-black": "#050507",
        "arc-deep": "#0a0a0f",
        "arc-red": "#ff2d55",
        "arc-pink": "#ff4d8d",
        "arc-glow": "#ff6b9d",
        "arc-white": "#ffffff",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "Times New Roman", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        // Display sizes
        "display-2xl": ["clamp(3.5rem, 9vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
        "display-xl": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "1.0", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem, 5.5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
      },
      animation: {
        "fade-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "float-y": "float 6s ease-in-out infinite",
        "subtle-pulse": "subtle-pulse 2s ease-in-out infinite",
        ticker: "ticker 60s linear infinite",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "subtle-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      maxWidth: {
        wide: "1440px",
        narrow: "1140px",
      },
    },
  },
  plugins: [],
};

export default config;
