const express = require('express')
const router = express.Router()

const articleController = require('../controllers/articleController')

router.get('/', articleController.get_articles)
router.post('/', articleController.create_article)
router.get('/:id', articleController.get_article)
router.put('/:id', articleController.update_article)
router.delete('/:id', articleController.destroy_article)

module.exports = router