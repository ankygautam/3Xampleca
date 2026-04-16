/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: "#0f172a",
        content: "#f8fafc",
        canvas: "#f1f5f9",
        line: "#dbe2ea",
        muted: "#64748b",
      },
      boxShadow: {
        panel: "0 8px 24px rgba(15, 23, 42, 0.08)",
        insetLine: "inset 0 1px 0 rgba(255,255,255,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
