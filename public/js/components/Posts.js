import Post from "./Post.js"

const Posts = (posts) => posts
  .map(post => Post({
    id: post.id,
    body: post.body,
    createdAt: post.createdAt,
    user: post.user,
    likes: post.likes,
  })).join('')


export default Posts