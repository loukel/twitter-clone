const getPosts = async () => {
  const posts = await fetch('/api/posts', {
    method: 'GET',
  }).then(res => res.json())

  console.log(posts)
}

const createPost = async (body) => {
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

export {
  getPosts,
  createPost,
}