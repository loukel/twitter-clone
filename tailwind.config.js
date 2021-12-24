export default {
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
    import('tailwindcss'),
    import('autoprefixer'),
    import('cssnano'),
  ]
}