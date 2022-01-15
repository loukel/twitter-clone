// Modified from https://stackoverflow.com/a/9642359
const rerender = () => {
  // Remove existing script

  document.getElementById('loader').classList.remove('hidden')
  let head = document.getElementsByTagName('head')[0]
  let script = document.getElementById('mainScript')
  head.removeChild(script)
  script = document.createElement('script')
  // The cacheBuster param ensures that the client doesn't default to using the cached script
  script.src = `./js/index.js?cacheBuster=${new Date().getTime()}`
  script.id = 'mainScript'
  script.type = 'module'
  head.appendChild(script)
}

window.rerender = rerender