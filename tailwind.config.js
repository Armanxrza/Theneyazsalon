/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        cream: {
          light: '#F6F1EB',
          DEFAULT: '#E8DED2',
          dark: '#D4C4B0',
        },
        gold: {
          light: '#D4B87E',
          DEFAULT: '#C6A769',
          dark: '#B89659',
        },
        charcoal: {
          light: '#2A3836',
          DEFAULT: '#1F2A28',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
