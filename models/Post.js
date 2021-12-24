import cuid from 'cuid'
import fs from 'fs'
let collectionName = 'posts'
const collectionFile = `./database/${collectionName}.json`

/**
 * Note
 * ESLint doesn't recognise the use of private methods in classes.
 * Private methods are declared with a # prefix.
 * ESLint doesn't know this.
 * I've used the old underscore prefix to identify private functions within object oriented code
 */

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
    if (!id) {
      this.create()
    }
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
    this.replaceStore(storeObj)
  }

  delete() {
    let storeObj = Post.getStore()
    storeObj = storeObj.filter(item => item.id !== this.id)
    this.replaceStore(storeObj)
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

  // Should be private function
  json() {
    let self = {}
    Object.keys(this).forEach(key => self[key] = this[key])
    return self
  }

  // Should be private function
  create() {
    let storeObj = Post.getStore()
    storeObj.push(this.json())
    this.replaceStore(storeObj)
  }

  // Should be private function
  replaceStore(storeObj) {
    const newStore = JSON.stringify(storeObj)
    fs.writeFileSync(collectionFile, newStore)
  }

  static getStore() {
    const store = fs.readFileSync(collectionFile)
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