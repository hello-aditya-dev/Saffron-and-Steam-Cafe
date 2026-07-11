import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F3EBDD",
        ivory: "#FBF7EF",
        espresso: "#2A1E18",
        cocoa: "#3A2922",
        tangerine: "#D65A31",
        saffron: "#E9A23B",
        olive: "#74724A",
        rose: "#BE7567",
        border: "rgba(42, 30, 24, 0.18)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(2rem, 5vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.01em" }],
        "heading": ["clamp(1.75rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "subheading": ["clamp(1.25rem, 2.5vw, 2rem)", { lineHeight: "1.2" }],
        "body-lg": ["clamp(1.05rem, 1.5vw, 1.25rem)", { lineHeight: "1.6" }],
      },
      maxWidth: {
        "site": "1440px",
      },
      borderRadius: {
        "brand": "2px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;