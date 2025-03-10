import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // 動的に使うクラスを追加
    'bg-blue-700',
    'hover:bg-blue-800',
    'bg-red-600',
    'hover:bg-red-700',
    'text-gray-700',
    'grow',
    'min-h-screen',
    'w-1/2',
    'mr-1',
    'px-2',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
