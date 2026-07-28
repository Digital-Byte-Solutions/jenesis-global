import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — flip automatically with the .dark class
        bg: "var(--bg)",
        surface: "var(--bg-elevated)",
        ink: "var(--text-1)",
        body: "var(--text-2)",
        faint: "var(--text-3)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
          glow: "var(--accent-glow)",
          deep: "var(--accent-deep)",
        },
      },
      borderColor: {
        DEFAULT: "var(--line)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Times New Roman", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(1.75rem, 2.8vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-xl": ["clamp(1.6rem, 2.4vw, 2.25rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.4rem, 2.0vw, 1.85rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.25rem, 1.6vw, 1.5rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      animation: {
        "fade-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "float-y": "float 6s ease-in-out infinite",
        "subtle-pulse": "subtle-pulse 2s ease-in-out infinite",
        ticker: "ticker 50s linear infinite",
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
      maxWidth: {
        wide: "1440px",
        narrow: "1140px",
      },
    },
  },
  plugins: [],
};

export default config;
