/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B3B35', // dark green
          hover: '#234941'
        },
        secondary: {
          DEFAULT: '#F5B642', // gold
          hover: '#DFA235'
        }
      }
    },
  },
  plugins: [],
};