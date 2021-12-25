import {
  getAuth,
}
from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"

const getPosts = async () => {
  const posts = await fetch('/api/posts', {
    method: 'GET',
  }).then(res => res.json())

  return posts
}

const createPost = async (body) => {
  const auth = getAuth()
  const user = auth.currentUser
  body.userId = user.uid

  const post = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  }).then(res => res.json())

  return post
}

const getPost = async (id) => {
  const post = await fetch(`/api/posts/${id}`).then(res => res.json())

  return post
}

export {
  getPosts,
  createPost,
  getPost,
}