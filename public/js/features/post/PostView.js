import { getPost } from "../../services/postApi.js"
import Post from "../../components/Post.js"

const PostView = async (id) => {
  let post = await getPost(id)

  return `
    <section class='body-font relative'>
      <button onclick='goHome()' class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-1 left-1'>
        go back
      </button>
      <div class="container px-5 py-24 mx-auto">
        ${Post(post)}
        <div class="mb-3 pt-0 flex">
          <textarea id='postInput' oninput='handleInput()' onkeypress='handleKeyPress()' rows=2 maxlength=100 placeholder="what you thinking about this"
            class="lowercase resize-none px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"></textarea>
          <button onClick='submitPost()' class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            reply
          </button>
        </div>
      </div>
    </section>
  `
}

export default PostView