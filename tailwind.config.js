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
          DEFAULT: '#3CB815',
          hover: '#339e12',
          light: '#eaf8e6',
          dark: '#26770e',
        },
        secondary: {
          DEFAULT: '#F65005',
          hover: '#d84402',
          light: '#fef1eb',
        },
        brandLight: '#F7F8FC',
        brandDark: '#111111',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 25px rgba(60, 184, 21, 0.15)',
      }
    },
  },
  plugins: [],
};

