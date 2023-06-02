/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        japanese: ['japanese', 'sans-serif'],
        gilroy: ['gilroy', 'sans-serif'],
      },
      colors: {
        primary: '#0e0e0e',
        subtext: '#6272A4',
        btn: '#B02E25',
      },
    },
  },
  plugins: [],
}