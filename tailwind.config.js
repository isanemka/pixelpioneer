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
      },
      colors: {
        primary: "#5200aa", // Lila (Bakgrund i `space-scene`)
        darkbg: "#111", // Mörk bottenfärg
        fireOrange: "#ff4500", // Eld-röd
        fireYellow: "#ffa500", // Eld-orange
        starWhite: "#ffffff", // Stjärnor
        hoverIndigo: "#6366f1", // Hover-effekt
      },
    },
  },
  plugins: [],
}

