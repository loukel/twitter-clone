import {
  getAuth,
}
from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import {
  getPosts
} from "../../services/postApi.js"
import NewPost from "./NewPost.js"
import Posts from "../../components/Posts.js"

const Feed = async () => {
  let posts = await getPosts()
  const auth = getAuth()
  const user = auth.currentUser
  window.page = 1
  window.loadingPosts = false
  window.lastPage = false
  const parameters = new URLSearchParams(window.location.search)

  // When the user scrolls to the bottom of the feed more posts load
  window.onscroll = async () => {
    if (parameters.get('userId') === null && !window.lastPage && !window.loadingPosts && window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      window.loadingPosts = true
      const postsEl = document.getElementById('posts')
      postsEl.innerHTML += `<div class='flex justify-center' id='loadingPosts'>Loading more posts...</div>`
      const morePosts = await getPosts(window.page + 1)
      const loadingPostsEl = document.getElementById('loadingPosts')
      postsEl.removeChild(loadingPostsEl)
      postsEl.innerHTML += Posts(morePosts)

      window.page += 1
      window.loadingPosts = false
      if (morePosts.length < 10) {
        window.lastPage = true
      }
    }
  }

  return `
    <div class="container px-5 py-12 mx-auto animate-fade">
      ${user 
          ? NewPost()
          : `
            <span>
              <span onClick='showLoginModal()' class='cursor-pointer hover:underline text-blue-700'>login</span> or <span onClick='showRegisterModal()' class='cursor-pointer hover:underline text-blue-700'>register</span> to post
            </span>
          `
      }
      <div id='posts'>
        ${Posts(posts)}
      </div>
    </div>
  `
}

export default Feed