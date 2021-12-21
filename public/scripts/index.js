const getPosts = async () => {
  const posts = await fetch('/api/posts', {
    method: 'GET',
  }).then(res => res.json())

  console.log(posts)
}

getPosts()