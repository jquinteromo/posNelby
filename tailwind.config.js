/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "!./node_modules/**/*", // Excluye explícitamente node_modules
  ],
  theme: {
    extend: {
      fontFamily: {
        muthiara: ['"Muthiara"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};