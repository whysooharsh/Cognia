import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
