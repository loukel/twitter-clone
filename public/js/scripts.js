// Modifed from codegrepper post created by https://www.codegrepper.com/profile/mitchell-yuen (js add params to url)
const goToPost = (id) => {
  const params = new URLSearchParams(window.location.search)

  params.set('postId', id)
  window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?${params}`))
  rerender()
}

// Modified from https://stackoverflow.com/a/9642359
const rerender = () => {
  // Remove existing script
  let head = document.getElementsByTagName('head')[0]
  let script = document.getElementById('mainScript')
  head.removeChild(script)

  script = document.createElement('script')
  script.src = './js/index.js?cachebuster='+ new Date().getTime()
  script.id = 'mainScript'
  script.type = 'module'
  head.appendChild(script)
  console.log('rerender')
}