import cuid from 'cuid'
import fs from 'fs'
import pluralize from 'pluralize'

class Model {
  constructor({
    id,
    createdAt,
    updatedAt,
  }) {
    this.id = id || cuid()
    this.createdAt = createdAt || new Date()
    this.updatedAt = updatedAt || this.createdAt
  }

  json() {
    let self = {}
    Object.keys(this).forEach(key => self[key] = this[key])
    return self
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
}

export default Model