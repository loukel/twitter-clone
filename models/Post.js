import Model from './Model.js'

class Post extends Model {
  constructor({
    id,
    createdAt,
    updatedAt,
    parentId,
    body,
  }) {
    super({
      id,
      createdAt,
      updatedAt,
    })
    this.parentId = parentId || null
    this.body = body || null
  }

  include({
    parent,
    children
  } = {
    parent: false,
    children: false
  }) {
    let obj = this.json()

    if (parent) {
      obj['parent'] = this.parent()
    }

    if (children) {
      obj['children'] = this.children()
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

  children() {
    return Post.findMany({
      parentId: this.id
    })
  }

  static create({
    parentId,
    body,
    createdAt,
    updatedAt
  }) {
    let storeObj = Post.getStore()
    let newPost = new Post({
      parentId,
      body,
      createdAt,
      updatedAt,
    })
    storeObj.push(newPost)
    Post.replaceStore(storeObj)
    return newPost
  }

  static findMany({
    parentId
  } = {
    parentId: false
  }) {
    if (parentId) {
      return this.getStore()
        .filter(item => item.parentId === parentId)
        .map(post => new Post(post))
    }
    return this.getStore().map(post => new Post(post))
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