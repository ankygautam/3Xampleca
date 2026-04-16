import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#534AB7",
          accent: "#7F77DD",
          surface: "#EEEDFE",
        },
        canvas: {
          light: "#F7F7FB",
          dark: "#0F1021",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 16, 33, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
