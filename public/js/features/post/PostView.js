import {
  createPost,
  getPost
} from "../../services/postApi.js"
import Post from "../../components/Post.js"
import Posts from "../../components/Posts.js"
import PostInput from "../../components/PostInput.js"

const PostView = async (id) => {
  let post = await getPost(id)

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
      const newReply = await createPost({
        body: reply,
        parentId: id
      })
      addChild(newReply)
      replyInputEl.value = ''
    }
  }

  window.submitReply = submitReply

  return `
    <button onclick='goHome()' class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-1 left-1'>
      back to feed
    </button>
    <div class="container px-5 py-24 mx-auto">
      ${post.parentId ? `<span class='mr-2'>replying to</span><span onClick="goToPost('${post.parentId}')">${post.parent.body}</span>` : ''}
      ${Post(post)}
      <div class="mb-3 pt-0 flex">
        ${PostInput({elementId: 'replyInput', placeHolder: 'what do you think about this'})}
        <button onClick='submitReply()' class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          reply
        </button>
      </div>
      <h5 class='text-xl font-medium leading-tight mt-0 mb-2 text-blue-600'>replies</h5>
      <div id='replies' class="mb-3 pt-0">
        ${Posts(post.children)}
      </div>
    </div>
  `
}

export default PostView