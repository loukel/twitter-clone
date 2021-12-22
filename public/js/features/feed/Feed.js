import { getPosts } from "../../services/postApi.js"
import NewPost from "./NewPost.js"
import Posts from "./Posts.js"

const Feed = async () => {
  let posts = await getPosts()

  return `
    <section class='body-font'>
      <div class="container px-5 py-24 mx-auto">
        ${NewPost(posts)}
        <div class="mb-3 pt-0">
          <input type="text" placeholder="find"
          class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
        </div>
        <div id='posts'>
          ${Posts(posts)}
        </div>
      </div>
    </section>
  `
}

export default Feed