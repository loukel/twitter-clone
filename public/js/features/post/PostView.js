import { createPost, getPost } from "../../services/postApi.js"
import Post from "../../components/Post.js"
import Posts from "../feed/Posts.js"

const PostView = async (id) => {
  let post = await getPost(id)
  console.log(post)

  const addChild = (reply) => {
    const repliesEl = document.getElementById('replies')
    post.children = [...post.children, reply]
    console.log(reply)
    repliesEl.innerHTML = Posts(post.children)
  }

  const submitReply = async () => {
    const replyInputEl = document.getElementById('replyInput')
    let reply = replyInputEl.value
    if (reply.length != 0 && reply !== ' ') {
      reply = reply.replace('.', " ").replace("  ", " ")
      const newReply = await createPost({body: reply, parentId: id})
      addChild(newReply)
      replyInputEl.value = ''
    }
  }

  window.submitReply = submitReply

  return `
    <section class='body-font relative'>
      <button onclick='goHome()' class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-1 left-1'>
        go back
      </button>
      <div class="container px-5 py-24 mx-auto">
        <span class='mr-2'>replying to</span><span>${post.parent.body}</span>
        ${Post(post)}
        <div class="mb-3 pt-0 flex">
          <textarea id='replyInput' rows=2 maxlength=100 placeholder="what you thinking about this"
            class="lowercase resize-none px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"></textarea>
          <button onClick='submitReply()' class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            reply
          </button>
        </div>
        <h5 class='text-xl font-medium leading-tight mt-0 mb-2 text-blue-600'>replies</h5>
        <div id='replies' class="mb-3 pt-0">
          ${Posts(post.children)}
        </div>
      </div>
    </section>
  `
}

export default PostView