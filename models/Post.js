import cuid from 'cuid'
import fs from 'fs'
import pluralize from 'pluralize'

class Post {
  constructor({
    id,
    parentId,
    body,
    createdAt,
    updatedAt
  }) {
    this.id = id || cuid()
    this.parentId = parentId || null
    this.body = body || null
    this.createdAt = createdAt || new Date()
    this.updatedAt = updatedAt || new Date()
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

  update({
    data
  }) {
    delete data['id']
    delete data['createdAt']
    Object.keys(data).forEach(key => this[key] = data[key])
    let storeObj = this.getStore()
    const index = storeObj.findIndex(item => item.id = this.id)
    storeObj[index] = this.json()
    Post.replaceStore(storeObj)
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

  json() {
    let self = {}
    Object.keys(this).forEach(key => self[key] = this[key])
    return self
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

  static replaceStore(storeObj) {
    const collectionName = pluralize(this.name.toLowerCase())
    const newStore = JSON.stringify(storeObj)
    fs.writeFileSync(`./database/${collectionName}.json`, newStore)
  }

  static getStore() {
    const collectionName = pluralize(this.name.toLowerCase())
    const store = fs.readFileSync(`./database/${collectionName}.json`)
    return JSON.parse(store)
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