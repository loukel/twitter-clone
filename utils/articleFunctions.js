let cuid = require('cuid')

const Article = ({
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
    createdAt: new Date(),
    updatedAt: new Date(),
})

module.exports = {
  Article,
}