import { getPost } from "../../services/postApi.js"
import Post from "../../components/Post.js"

const PostView = async (id) => {
  let post = await getPost(id)

  return `
    <section class='body-font'>
      <div class="container px-5 py-24 mx-auto">
        ${Post(post)}
      </div>
    </section>
  `
}
 
export default PostView