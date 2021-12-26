import Post from '../models/Post.js'

const get_posts = async (req, res) => {
  const posts = await Post.findMany({
    include: {
      user: true,
      likes: true,
    }
  })
  res.status(200).send(posts)
}

const create_post = async (req, res) => {
  const data = req.body
  let post = Post.create(data)
  res.status(201).send(await post.include({
    user: true
  }))
}

const get_post = async (req, res) => {
  const id = req.params.id
  const post = Post.find(id)
  if (post) {
    res.status(200).send(await post.include({
      parent: true,
      children: true,
      user: true,
      likes: true,
    }))
  } else {
    res.sendStatus(404)
  }
}

const destroy_post = (req, res) => {
  const id = req.params.id
  let post = Post.find(id)
  if (post === -1) {
    res.sendStatus(404)
  } else {
    post.delete()
    res.status(200).send(post)
  }
}

export default {
  get_posts,
  create_post,
  get_post,
  destroy_post,
}