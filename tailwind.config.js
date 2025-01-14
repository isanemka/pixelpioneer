/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        freepixel: ['FreePixel', 'sans-serif'],
        "press-start-2p": ['"Press Start 2P"', 'sans-serif'],
        vt323: ['VT323', 'sans-serif'],
      },
      colors: {
        primary: "#5200aa", // Purple (Background color in `space-scene`)
        secondary: "#62C2E6", // Light blue (Background GitHubProjects section)
        darkbg: "#111", // Dark background color
        fireOrange: "#ff4500", // Fire-red
        fireYellow: "#ffa500", // Fire-orange
        starWhite: "#ffffff", // Stars color
        hoverIndigo: "#6366f1", // Hover effect color
        limegreen: 'rgb(50, 205, 50)', // Lime green
      },
      boxShadow: {
        limegreen: '0 0 10px rgb(50, 205, 50)', // Lime green box-shadow
      },
    },
  },
  plugins: [],
}