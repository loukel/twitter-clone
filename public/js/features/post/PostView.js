import {
  createPost,
  getPost
} from "../../services/postApi.js"
import Post from "../../components/Post.js"
import Posts from "../../components/Posts.js"
import PostInput from "../../components/PostInput.js"
import {
  getAuth,
}
from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"

const PostView = async (id) => {
  let post = await getPost(id)

  if (!post) {
    window.goHome()
  }
  const auth = getAuth()
  const user = auth.currentUser

  const addChild = (reply) => {
    const repliesEl = document.getElementById('replies')
    post.children = [...post.children, reply]
    repliesEl.innerHTML = Posts(post.children)
  }

  window.submitReply = async () => {
    const e = self.event
    e.preventDefault()
    let reply = e.target.elements[0].value
    if (reply.length != 0 && reply !== ' ') {
      const newReply = await createPost({
        body: reply,
        parentId: id
      })
      newReply.likes = []
      newReply.user = user
      addChild(newReply)
      reply = ''
    }
  }

  return `
    <div class="container px-5 py-12 mx-auto animate-fade">
      ${post.parentId ? `<span class='mr-2'>Replying to →</span><span class='cursor-pointer text-blue-500' onClick="goToPost('${post.parentId}')">${post.parent.body}</span>` : ''}
      ${Post(post)}
      ${user 
        ? `
          <form class="mb-3 pt-0 flex" onSubmit='submitReply()'>
            ${PostInput({elementId: 'replyInput', placeHolder: 'What do you think about this?'})}
            <button type='submit' class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              reply
            </button>
          </form>
        `
        : `
          <span>
            <span onClick='showLoginModal()' class='cursor-pointer hover:underline text-blue-700'>login</span> or <span onClick='showRegisterModal()' class='cursor-pointer hover:underline text-blue-700'>register</span> to reply and like
          </span>
        `
      }
      <h5 class='text-xl font-medium leading-tight mt-0 mb-2 text-blue-600'>replies</h5>
      <div id='replies' class="mb-3 pt-0">
        ${post.children.length > 0 ? Posts(post.children) : ''}
      </div>
    </div>
  `
}

export default PostView