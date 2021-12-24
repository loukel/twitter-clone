import Post from "./Post.js"

// Modified from https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
const orderByDate = (array) => array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

const Posts = (posts) => orderByDate(posts)
  .map(post => Post({
    id: post.id,
    body: post.body,
    createdAt: post.createdAt
  }))
  .join('')


export default Posts