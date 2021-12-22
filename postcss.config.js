// Reference on how to use tailwind css with express
// https://dev.to/jumbo02/how-to-use-tailwind-css-in-an-expressjs-app-2c7c
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('cssnano'),
  ]
}