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
          beige: '#F8F4E3',
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
        storage: {
            fridge: '#73C07A',
            shelf: '#C09673',
            frozen: '#73A4C0',
        }
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

