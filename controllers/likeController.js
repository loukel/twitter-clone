import Like from '../models/Like.js'

const create_like = (req, res) => {
  const data = req.body
  let like = Like.create(data)
  res.status(201).send(like)
}

const destroy_like = (req, res) => {
  const id = req.params.id
  let like = Like.find(id)
  if (like === -1) {
    res.sendStatus(404)
  } else {
    like.delete()
    res.status(200).send(like)
  }
}

export default {
  create_like,
  destroy_like,
}