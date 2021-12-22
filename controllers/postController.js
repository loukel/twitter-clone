let Post = require('../models/Post')

const get_posts = (req, res) => {
  res.status(200).send(Post.findMany())
}

const create_post = (req, res) => {
  const data = req.body
  let post = new Post(data)
  res.status(201).send(post)
}

const get_post = (req, res) => {
  const id = req.params.id
  const post = Post.find(id)
  res.status(200).send(post)
}

const update_post = (req, res) => {
  const id = req.params.id
  const data = req.body
  let post = Post.find(id)
  if (post === -1) {
    res.sendStatus(404)
  } else {
    post.update(data)
    console.log(post)
    res.sendStatus(204)
  }
}

const destroy_post = (req, res) => {
  const id = req.params.id
  let post = Post.find(id)
  if (post === -1) {
    res.sendStatus(404)
  } else {
    post.delete()
    res.sendStatus(204)
  }
}

module.exports = {
  get_posts,
  create_post,
  get_post,
  update_post,
  destroy_post,
}