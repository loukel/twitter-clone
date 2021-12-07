let cuid = require('cuid')

const article = ({
  authorUID,
  title,
  description,
  body,
  category,
}) => ({
    id: cuid(),
    authorUID,
    title,
    description: description || null,
    body: body,
    category: category || null,
})

module.exports = {
  article,
}