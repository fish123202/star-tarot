import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        "card-face": "var(--card-bg)",
        "card-ink": "var(--card-ink)",
        muted: "var(--muted)",
        border: "var(--border)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Noto Serif SC", "Songti SC", "serif"],
        sans: ["var(--font-sans)", "PingFang SC", "Microsoft YaHei", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
