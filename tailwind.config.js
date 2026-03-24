/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        banner: "#304221",
        yellow: {
          primary: "#FFC222"
        }
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '1440px',
      }
    },
  },
  plugins: [],
}

