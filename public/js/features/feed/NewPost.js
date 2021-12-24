import {
  createPost
} from "../../services/postApi.js"
import Posts from "../../components/Posts.js"
import PostInput from "../../components/PostInput.js"

const NewPost = (posts) => {
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
      const newPost = await createPost({
        body: post
      })
      addPost(newPost)
      postInputEl.value = ''
    }
  }

  window.submitPost = submitPost

  return `
    <div class="mb-3 pt-0 flex">
      ${PostInput({ elementId: 'postInput', placeHolder: 'what are you thinking'})}
      <button onClick='submitPost()' class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        post
      </button>
    </div>
  `
}

export default NewPost