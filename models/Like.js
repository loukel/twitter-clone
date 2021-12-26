import admin from '../lib/firebaseAdmin.js'
import Model from './Model.js'
import Post from './Post.js'

class Like extends Model {
  constructor({
    id,
    createdAt,
    updatedAt,
    postId,
    userId,
  }) {
    super({
      id,
      createdAt,
      updatedAt,
    })
    this.postId = postId
    this.userId = userId
  }

  async include({
    post,
    user,
  } = {
    post: false,
    user: false,
  }) {
    let obj = this.json()

    if (post) {
      obj['post'] = this.post()
    }

    if (user) {
      obj['user'] = await this.user()
    }

    return obj
  }

  delete() {
    let storeObj = Like.getStore()
    storeObj = storeObj.filter(item => item.id !== this.id)
    Like.replaceStore(storeObj)
    this.id = -1
  }

  post() {
    return Post.find(this.postId)
  }

  async user() {
    const userRecord = await admin
      .auth()
      .getUser(this.userId)
    return userRecord
  }

  static create({
    postId,
    userId,
  }) {
    let storeObj = Like.getStore()
    let newLike = new Like({
      postId,
      userId,
    })
    storeObj.push(newLike)
    Like.replaceStore(storeObj)
    return newLike
  }

  static async findMany({
    postId,
    userId,
    include,
  } = {
    postId: null,
    userId: null,
    include: {
      post: false,
      user: false,
    },
  }) {
    let likes = this.getStore()
    if (postId) {
      likes = likes.filter(item => item.postId === postId)
    }

    if (userId) {
      likes = likes.filter(item => item.userId === userId)
    }

    likes = likes.map(like => new Like(like))
    for (let index = 0; index < likes.length; index += 1) {
      likes[index] = await likes[index].include({
        ...include
      })
    }
    return likes
  }

  static find(id) {
    const [like] = this.getStore().filter(like => like.id === id)
    if (!like) {
      return false
    } else {
      return new Like(like)
    }
  }
}

export default Like