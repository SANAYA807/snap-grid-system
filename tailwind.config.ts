import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    // Add dynamic classes that Tailwind might miss
    'col-start-1', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5',
    'row-start-1', 'row-start-2', 'row-start-3', 'row-start-4', 'row-start-5',
    'col-span-1', 'col-span-2', 'col-span-3', 'col-span-4', 'col-span-5',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
