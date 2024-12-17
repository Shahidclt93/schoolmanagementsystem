/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "sans":["Poppins", "sans-serif"],
      },
      colors:{
        primary:"#FFFFFF",
        secondary:"#000000",

        blue:"#3390FF",
        lightblue:"#D7DBDD"
      }
    },
  },
  plugins: [],
}