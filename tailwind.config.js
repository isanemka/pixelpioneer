/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        freepixel: ['FreePixel', 'sans-serif'],
        "press-start-2p": ['"Press Start 2P"', 'sans-serif'],
        vt323: ['VT323', 'sans-serif'],
      },
      colors: {
        primary: "#5200aa", // Purple (Background color in `space-scene`)
        darkbg: "#111", // Dark background color
        fireOrange: "#ff4500", // Fire-red
        fireYellow: "#ffa500", // Fire-orange
        starWhite: "#ffffff", // Stars color
        hoverIndigo: "#6366f1", // Hover effect color
      },
    },
  },
  plugins: [],
}