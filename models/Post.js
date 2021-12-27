import admin from '../lib/firebaseAdmin.js'
import Model from './Model.js'
import Like from './Like.js'

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

  async include({
    parent,
    children,
    user,
    likes,
  } = {
    parent: false,
    children: false,
    user: false,
    likes: false,
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

    if (likes) {
      obj['likes'] = await this.likes()
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
    const userId = this.userId
    const userRecord = await admin
      .auth()
      .getUser(`${userId}`)
    return userRecord
  }

  async likes() {
    const likes = await Like.findMany({
      postId: this.id
    })
    return likes
  }

  static create({
    parentId,
    body,
    userId,
  }) {
    let storeObj = Post.getStore()
    let newPost = new Post({
      parentId,
      body,
      userId,
    })
    storeObj.push(newPost)
    Post.replaceStore(storeObj)
    return newPost
  }

  static async findMany({
    parentId,
    userId,
    include,
  } = {
    parentId: false,
    userId: false,
    include: {
      parent: false,
      children: false,
      user: false,
      likes: false,
    },
  }) {
    let posts = this.getStore()
    if (parentId) {
      posts = posts.filter(item => item.parentId === parentId)
    }
    if (userId) {
      posts = posts.filter(item => item.userId === userId)
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