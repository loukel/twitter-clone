/*
 * Reference on how to use tailwind css with express
 * https://dev.to/jumbo02/how-to-use-tailwind-css-in-an-expressjs-app-2c7c
 */
export default {
  plugins: [
    import('tailwindcss'),
    import('autoprefixer'),
    import('cssnano'),
  ]
}