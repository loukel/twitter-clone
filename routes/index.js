const express = require('express')
const router = express.Router()

const articleRoutes = require('./articleRoutes')

router.use('/articles', articleRoutes)

router.use((req, res) => {
  res.sendStatus(404)
  // Render 404 page
})

module.exports = router