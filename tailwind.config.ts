import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'rgb': 'rgb 3s infinite',
      },
      keyframes: {
        rgb: {
          '0%, 100%': { color: '#0000ff' }, // Blu
          '33%': { color: '#ff0000' },      // Rosso
          '66%': { color: '#00ff00' },      // Verde
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bluModerato: '#00376e',
        bianco: '#FFFFFF',
        grigioChiaro: '#E5E7EB',
        grigioScuro: '#374151',
      },
    },
  },
  plugins: [],
};
export default config;
