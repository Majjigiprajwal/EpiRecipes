/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FF6B6B',
          DEFAULT: '#FF3333',
          dark: '#E60000',
        },
        secondary: {
          light: '#FFD166',
          DEFAULT: '#FFC233',
          dark: '#E6A800',
        },
        neutral: {
          light: '#F8F9FA',
          DEFAULT: '#E9ECEF',
          dark: '#343A40',
        },
        accent: {
          light: '#4ECDC4',
          DEFAULT: '#45B7AA',
          dark: '#3A9690',
        },
      },
    },
  },
  plugins: [],
}


