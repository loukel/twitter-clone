let Post = require('../models/Post')

let post1 = new Post({body: 'cool post'})
let post2 = new Post({body: 'cool post 2'})

console.log(Post.find(post1.id))