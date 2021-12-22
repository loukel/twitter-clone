import { createPost, getPosts } from "./services/postApi.js"

const main = () => {
  let posts = getPosts()

  const newPostEl = document.getElementById('newPost')
  const postSumbitEl = document.getElementById('postSubmit')

  const submitPost = async () => {
    let post = newPostEl.value
    if (post.length != 0 && post !== ' ') {
      post = post.replace('.', " ").replace("  ", " ")
      await createPost({body: post})
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