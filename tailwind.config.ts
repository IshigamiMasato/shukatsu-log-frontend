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
    'mr-2',
    'bg-white',
    'text-gray-800',
    'bg-blue-100',
    'text-blue-800',
    'bg-indigo-100',
    'text-indigo-800',
    'bg-green-100',
    'text-green-800',
    'bg-red-100',
    'text-red-800',
    'bg-gray-100',
    'text-gray-800',
    'border',
    'me-2',
    'px-2.5',
    'py-0.5',
    'rounded-full',
    'text-nowrap',
    'justify-end',
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
