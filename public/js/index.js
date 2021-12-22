import Feed from "./features/feed/Feed.js"
import PostView from "./features/post/PostView.js"
 
const parameters = new URLSearchParams(window.location.search)
const postId = parameters.get('postId')

const main = async () => {
  const rootEl = document.getElementById('root')

  if (!postId) {
    rootEl.innerHTML = await Feed()
  } else {
    rootEl.innerHTML = await PostView(postId)
  }
}

main()