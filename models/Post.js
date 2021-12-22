let cuid = require('cuid')
let fs = require('fs')
let collectionName = 'posts'
const collectionFile =`./database/${collectionName}.json`

class Post{
  constructor({id, body, createdAt, updatedAt}) {
    this.id = id || cuid()
    this.body = body
    this.createdAt = createdAt || new Date()
    this.updatedAt = updatedAt || new Date()
    if (!id) {
      this.#create()
    }
  }

  update({data}) {
    delete data['id']
    delete data['createdAt']
    Object.keys(data).forEach(key => this[key] = data[key])
    let storeObj = this.getStore()
    const index = storeObj.findIndex(item => item.id = this.id)
    storeObj[index] = this.#json()
    this.#replaceStore(storeObj)
  }

  delete() {
    let storeObj = Post.getStore()
    storeObj = storeObj.filter(item => item.id !== this.id)
    this.#replaceStore(storeObj)
    this.id = -1
  }

  #json() {
    let self = {}
    Object.keys(this).forEach(key => self[key] = this[key])
    return self
  }

  #create() {
    let storeObj = Post.getStore()
    storeObj.push(this.#json())
    this.#replaceStore(storeObj)
  }

  #replaceStore(storeObj) {
    const newStore = JSON.stringify(storeObj)
    fs.writeFileSync(collectionFile, newStore)
  }

  static getStore() {
    const store = fs.readFileSync(collectionFile)
    return JSON.parse(store)
  }

  static findMany() {
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

module.exports = Post