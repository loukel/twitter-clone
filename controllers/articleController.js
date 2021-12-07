let fs = require('fs')

const get_articles = (req, res) => {
  let store = fs.readFileSync("./store.json")
  let storeObj = JSON.parse(store)
  res.status(200).send(storeObj)
}

const create_article = (req, res) => {

}

const get_article = (req, res) => {
  const id = req.params.id
  const store = fs.readFileSync("./store.json")
  const storeObj = JSON.parse(store)
  const [article] = storeObj.filter(article => article.id == id)
  res.status(200).send(article)
}

const update_article = (req, res) => {

}

const destroy_article = (req, res) => {
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
  get_articles,
  create_article,
  get_article,
  update_article,
  destroy_article,
}