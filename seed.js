import Post from './models/Post.js'

let post1 = Post.create({
  body: 'cool post'
})

Post.create({
  parentId: post1.id,
  body: 'cool post 2'
})