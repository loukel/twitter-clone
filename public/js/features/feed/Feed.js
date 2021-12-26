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

  return `
    <div class="container px-5 py-24 mx-auto">
      ${user 
          ? NewPost(posts)
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