import admin from '../lib/firebaseAdmin.js'
import Model from './Model.js'

class Post extends Model {
  constructor({
    id,
    createdAt,
    updatedAt,
    userId,
    parentId,
    body,
  }) {
    super({
      id,
      createdAt,
      updatedAt,
    })
    this.parentId = parentId || null
    this.body = body
    this.userId = userId
  }

  // Include user details as well
  async include({
    parent,
    children,
    user,
  } = {
    parent: false,
    children: false,
    user: false,
  }) {
    let obj = this.json()

    if (parent) {
      obj['parent'] = this.parent()
    }

    if (children) {
      obj['children'] = await this.children()
    }

    if (user) {
      obj['user'] = await this.user()
    }

    return obj
  }

  delete() {
    let storeObj = Post.getStore()
    storeObj = storeObj.filter(item => item.id !== this.id)
    Post.replaceStore(storeObj)
    this.id = -1
  }

  parent() {
    return Post.find(this.parentId)
  }

  async children() {
    const posts = await Post.findMany({
      parentId: this.id
    })
    return posts
  }

  async user() {
    const userRecord = await admin
      .auth()
      .getUser(this.userId)
    return userRecord
  }

  static create({
    parentId,
    body,
    userId,
    createdAt,
    updatedAt
  }) {
    let storeObj = Post.getStore()
    let newPost = new Post({
      parentId,
      body,
      userId,
      createdAt,
      updatedAt,
    })
    storeObj.push(newPost)
    Post.replaceStore(storeObj)
    return newPost
  }

  static async findMany({
    parentId,
    include,
  } = {
    parentId: false,
    include: {
      parent: false,
      children: false,
      user: false,
    },
  }) {
    let posts = this.getStore()
    if (parentId) {
      posts = posts.filter(item => item.parentId === parentId)
    }
    posts = posts.map(post => new Post(post))
    for (let index = 0; index < posts.length; index += 1) {
      posts[index] = await posts[index].include({
        ...include
      })
    }
    return posts
  }

  static find(id) {
    const [post] = this.getStore().filter(post => post.id === id)
    if (!post) {
      return false
    } else {
      return new Post(post)
    }
  }
}

export default Post