// tailwind.config.ts
// This file extends Tailwind's default configuration with Predictabl's
// custom design tokens -- colors, fonts, and spacing that match our UI.
// Any custom value we define here becomes available as a Tailwind class
// throughout the entire project.

import type { Config } from "tailwindcss";

const config: Config = {
  // Tell Tailwind which files to scan for class names.
  // It removes unused styles in production, keeping the CSS bundle small.
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // Our custom color palette.
      // Usage example: className="bg-brand-dark text-brand-green"
      colors: {
        brand: {
          // The main neon green used for CTAs, highlights, active states
          green: "#00FF87",
          // A slightly dimmer green for secondary text and accents
          "green-dim": "#00CC6A",
          // The deepest background -- used for the page itself
          dark: "#0A0A0A",
          // Slightly lighter dark -- used for cards and panels
          card: "#111111",
          // Even lighter -- used for inputs and nested elements
          surface: "#1A1A1A",
          // Border color for cards and dividers
          border: "#222222",
          // Orange used for "CLOSING SOON" urgency states
          orange: "#FF8C00",
          // Red used for loss outcomes and errors
          red: "#FF3B3B",
          // Muted text -- labels, secondary info
          muted: "#666666",
          // Primary white text
          white: "#FFFFFF",
          // Slightly dimmed white for secondary text
          "white-dim": "#AAAAAA",
        },
      },

      // Custom font families.
      // We use Inter for body text (clean and readable)
      // and Barlow Condensed for bold display headings (sporty feel)
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Barlow Condensed", "sans-serif"],
      },

      // Custom screen breakpoints.
      // We design desktop-first since this is a web app.
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      // Custom border radius values to keep UI consistent
      borderRadius: {
        DEFAULT: "8px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },

  plugins: [],
};

export default config;