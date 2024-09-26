/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          gray: '#D9D9D9',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#B0B0B0',
          light: '#FFFFFF',
        },
        accent: {
          teal: '#20C997',
          blue: '#339AF0',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      wordBreak: ['responsive'],
    },
  },
  plugins: [],
}

