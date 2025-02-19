/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary : "#F8FBFB",
        secondary : "#E8F9FF",
        accent : "#3674B5"
      }
    },
  },
  plugins: [],
}