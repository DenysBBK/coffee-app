/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', 
  './src/*.{vue,js,ts,jsx,tsx}',
  './src/components/*.{html,js,vue}',
  './src/components/ui/*.{html,js,vue}'],

  theme: {
    extend: {
      backgroundImage:{
        'hero-pattern': "url('/images/coffee-beans.png')"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

