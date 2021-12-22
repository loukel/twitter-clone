import { getPost } from "../../services/postApi.js"
import Post from "../../components/Post.js"

const PostView = async (id) => {
  let post = await getPost(id)

  return `
    <section class='body-font relative'>
      <button onclick='goHome()' class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-1 left-1'>
        < Go Home
      </button>
      <div class="container px-5 py-24 mx-auto">
        ${Post(post)}
      </div>
    </section>
  `
}
 
export default PostView