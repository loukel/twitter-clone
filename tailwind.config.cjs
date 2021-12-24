/* eslint-env node */
module.exports = {
  purge: [],
  // DarkMode can be false or 'media' or 'class'
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('cssnano')
  ]
}