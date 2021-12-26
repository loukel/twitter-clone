import {
  getAuth,
}
from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"

const getLikes = async ({
  userId,
} = {
  userId: null,
}) => {
  const likes = await fetch(`/api/likes?userId=${userId}`, {
      method: 'GET',
    }).then(res => res.json())
    .catch((error) => {
      console.error(error)
      return false
    })

  return likes
}

const createLike = async (body) => {
  const auth = getAuth()
  const user = auth.currentUser
  body.userId = user.uid

  const like = await fetch('/api/likes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    }).then(res => res.json())
    .catch((error) => {
      console.error(error)
      return false
    })

  return like
}

const destroyLike = id => fetch(`/api/likes/${id}`, {
    method: 'DELETE',
  })
  .then(res => res.json())
  .catch(error => {
    console.error(error)
    return false
  })

export {
  getLikes,
  createLike,
  destroyLike,
}