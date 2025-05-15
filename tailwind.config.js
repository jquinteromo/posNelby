// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de que coincide con tu estructura
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1D4ED8',
        'custom-green': '#10B981',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }, // Parpadeo completo
        },
      },
      animation: {
        blink: "blink 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
