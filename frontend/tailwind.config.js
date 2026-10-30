/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: { 50: '#f0fdfa', 100: '#ccfbf1', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59' },
        emerald: { 400: '#34d399', 600: '#059669' },
      },
      fontFamily: { sans: ['system-ui', 'Segoe UI', 'sans-serif'] },
    },
  },
  plugins: [],
};
