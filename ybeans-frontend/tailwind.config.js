/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coffee-dark': '#3C2A21',
        'coffee-medium': '#967259',
        'coffee-light': '#DBC1AC',
      },
    },
  },
  plugins: [],
}

