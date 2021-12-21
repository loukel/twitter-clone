let fs = require('fs')
const { Article } = require('../utils/articleFunctions')

const get_posts = (req, res) => {
  let store = fs.readFileSync("./store.json")
  let storeObj = JSON.parse(store)
  res.status(200).send(storeObj)
}

const create_post = (req, res) => {
  const data = req.body
  const store = fs.readFileSync("./store.json")
  let storeObj = JSON.parse(store)
  const articleObj = Article(data)
  storeObj.push(articleObj)
  const newStore = JSON.stringify(storeObj)
  fs.writeFileSync("./store.json", newStore)
  res.status(201).send(articleObj)
}

const get_post = (req, res) => {
  const id = req.params.id
  const store = fs.readFileSync("./store.json")
  const storeObj = JSON.parse(store)
  const [article] = storeObj.filter(article => article.id == id)
  res.status(200).send(article)
}

const update_post = (req, res) => {
  const id = req.params.id
  const data = req.body
  const store = fs.readFileSync("./store.json")
  let storeObj = JSON.parse(store)
  if (storeObj.filter(article => article.id == id)) {
    storeObj = storeObj.map(article => {
      if (article.id != id) {
        return article
      } else {
        return {...article, ...data}
      }
    })
    const newStore = JSON.stringify(storeObj)
    fs.writeFileSync("./store.json", newStore)
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
}

const destroy_post = (req, res) => {
  const id = req.params.id
  const store = fs.readFileSync("./store.json")
  let storeObj = JSON.parse(store)
  if (storeObj.filter(article => article.id == id).length == 1) {
    storeObj = storeObj.filter(article => article.id != id)
    const newStore = JSON.stringify(storeObj)
    fs.writeFileSync("./store.json", newStore)
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
}

module.exports = {
  get_posts,
  create_post,
  get_post,
  update_post,
  destroy_post,
}