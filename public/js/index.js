import Feed from "./features/feed/Feed.js"
import PostView from "./features/post/PostView.js"
 
const parameters = new URLSearchParams(window.location.search)
const postId = parameters.get('postId')

const main = async () => {
  const goHome = () => {
    window.history.pushState({}, document.title, window.location.pathname)
    rerender()
  }
  
  window.goHome = goHome

  const rootEl = document.getElementById('root')

  if (!postId) {
    rootEl.innerHTML = await Feed()
  } else {
    rootEl.innerHTML = await PostView(postId)
  }
}

main()