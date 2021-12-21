// modified from https://stackoverflow.com/questions/17572873/how-can-i-check-if-a-string-is-all-uppercase-in-javascript
const isUpper = (str) => {
  return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}

export {
  isUpper
}