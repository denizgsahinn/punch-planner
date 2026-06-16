import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:        "#F7F3ED",
        "cream-dark": "#EDE7DF",
        rose:         "#E8C4B8",
        "rose-dark":  "#D4A899",
        sage:         "#8FAF8A",
        "sage-dark":  "#6B9A67",
        brown:        "#6B4C3B",
        "brown-dark": "#3a2e26",
        lavender:     "#C4BEDE",
        muted:        "#9C8B81",
        "card-border":"#E4DBD4",
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans:  ["var(--font-sans)"],
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};

export default config;