import Post from "./components/Post.js"
import Posts from "./components/Posts.js"
import { createPost, getPosts, getPost } from "./services/postApi.js"

const queryString = window.location.search
const parameters = new URLSearchParams(queryString)
const postId = parameters.get('postId')

const main = async () => {
  const postsEl = document.getElementById('posts')
  const newPostEl = document.getElementById('newPost')
  const postSumbitEl = document.getElementById('postSubmit')

  if (!postId) {
    let posts = await getPosts()
    postsEl.innerHTML = Posts({posts})
  } else {
    let post = await getPost(postId)
    console.log(post)
    postsEl.innerHTML = Post(post)
  }

  const addPost = (post) => {
    posts.push(post)
    postsEl.innerHTML = Posts({posts})
  }

  const submitPost = async () => {
    let post = newPostEl.value
    if (post.length != 0 && post !== ' ') {
      post = post.replace('.', " ").replace("  ", " ")
      const newPost = await createPost({body: post})
      addPost(newPost)
      newPostEl.value = ''
    }
  }
  
  // Prevent any character except from letters from being entered
  newPostEl.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submitPost()
    }

    if (e.key !== ' ') {
      let re = /[a-zA-Z]$/
      if (!re.test(e.key)) {
        e.preventDefault()
      }
    }
  })
  
  newPostEl.addEventListener('input', e => {
    // Remove periods (auto added with double space on mac)
    e.target.value = e.target.value.replace('.', " ")
    // Remove double spaces
    e.target.value = e.target.value.replace("  ", " ")
    // Remove empty space post
    if (e.target.value === ' ') {
      e.target.value = ''
    }
  })

  postSumbitEl.addEventListener('click', submitPost)
}

main()