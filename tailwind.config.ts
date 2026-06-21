import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Background: Deep Forest Midnight
        forest: {
          midnight: "#0B132B",
          dark: "#1C2541",
          light: "#3A506B",
        },
        // Accents & Highlights: Premium Metallic Gold
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E8C547",
          dark: "#B8962F",
          muted: "#8B7355",
        },
        // Typography Text: Clean cream/off-white
        cream: {
          DEFAULT: "#F5F5DC",
          light: "#FAF8F0",
          dark: "#E8E4D9",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
}
export default config
