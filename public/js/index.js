import Feed from "./features/feed/Feed.js"
import PostView from "./features/post/PostView.js"

const parameters = new URLSearchParams(window.location.search)
const postId = parameters.get('postId')

const main = async () => {
  const goHome = () => {
    window.history.pushState({}, document.title, window.location.pathname)
    window.rerender()
  }

  window.goHome = goHome

  const rootEl = document.getElementById('root')

  let page = ''
  if (!postId) {
    page = await Feed()
  } else {
    page = await PostView(postId)
  }

  rootEl.innerHTML = `
    <section class='body-font relative'>
      ${page}
    </section>
  `
}

main()