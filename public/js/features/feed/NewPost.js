import { createPost } from "../../services/postApi.js"
import Posts from "./Posts.js"

const NewPost = (posts) => {
  // Prevent any character except from letters from being entered
  const handleKeyPress = () => {
    const e = self.event
    if (e.key === 'Enter') {
      e.preventDefault()
      submitPost()
    }

    if (e.key !== ' ') {
      let re = /[a-zA-Z0-9]$/
      if (!re.test(e.key)) {
        e.preventDefault()
      }
    }
  }

  const handleInput = () => {
    const e = self.event
    // Remove periods (auto added with double space on mac)
    e.target.value = e.target.value.replace('.', " ")
    // Remove double spaces
    e.target.value = e.target.value.replace("  ", " ")
    // Remove empty space post
    if (e.target.value === ' ') {
      e.target.value = ''
    }
  }

  const addPost = (post) => {
    const postsEl = document.getElementById('posts')
    posts.push(post)
    postsEl.innerHTML = Posts(posts)
  }

  const submitPost = async () => {
    const postInputEl = document.getElementById('postInput')
    let post = postInputEl.value
    if (post.length != 0 && post !== ' ') {
      post = post.replace('.', " ").replace("  ", " ")
      const newPost = await createPost({body: post})
      addPost(newPost)
      postInputEl.value = ''
    } 
  }

  window.submitPost = submitPost
  window.handleKeyPress = handleKeyPress
  window.handleInput = handleInput

  return `
    <div class="mb-3 pt-0 flex">
      <textarea id='postInput' oninput='handleInput()' onkeypress='handleKeyPress()' rows=2 maxlength=100 placeholder="what you thinking"
        class="lowercase resize-none px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"></textarea>
      <button onClick='submitPost()' class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        post
      </button>
    </div>
  `
}

export default NewPost