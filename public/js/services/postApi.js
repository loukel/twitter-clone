import {
  getAuth,
}
from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"

const getPosts = async (page) => {
  const posts = await fetch(`/api/posts?page=${page || 1}`, {
    method: 'GET',
  }).then(res => res.json())

  return posts
}

const createPost = async (body) => {
  const auth = getAuth()
  const user = auth.currentUser
  body.userId = user.uid

  const post = await fetch('/api/posts/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
    .then(res => res.json())
    .catch(error => console.log(error))

  return post
}

const getPost = async (id) => {
  const post = await fetch(`/api/posts/${id}`)
    .then(res => res.json())
    .catch(error => {
      console.error(error)
      return false
    })

  return post
}

export {
  getPosts,
  createPost,
  getPost,
}