import {
  createPost
} from "../../services/postApi.js"
import Posts from "../../components/Posts.js"
import PostInput from "../../components/PostInput.js"
import {
  getAuth,
}
from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import handshake from "../../utils/handshake.js"

const NewPost = () => {
  const auth = getAuth()

  const addPost = post => {
    const postsEl = document.getElementById('posts')
    postsEl.innerHTML = Posts([post]) + postsEl.innerHTML
  }

  window.submitPost = () => {
    const e = self.event
    e.preventDefault()
    handshake(async () => {
      const postInputEl = document.getElementById('postInput')
      let post = postInputEl.value
      if (post.length != 0 && post !== ' ') {
        post = post.replace('.', " ").replace("  ", " ")
        const newPost = await createPost({
          body: post
        })
        newPost.user = auth.currentUser
        newPost.likes = []
        addPost(newPost)
        postInputEl.value = ''
      }
    })
  }

  return `
    <form class="mb-3 pt-0 flex" onSubmit='submitPost()'>
      ${PostInput({ elementId: 'postInput', placeHolder: 'what are you thinking' })}
      <button type='submit' class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        post
      </button>
    </form>
  `
}

export default NewPost