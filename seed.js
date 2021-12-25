import Post from './models/Post.js'

let post1 = new Post({
  body: 'cool post'
})

new Post({
  parentId: post1.id,
  body: 'cool post 2'
})

console.log(Post.find(post1.id))