const express = require('express')
const router = express.Router()

const postController = require('../controllers/postController')

router.get('/', postController.get_posts)
router.post('/', postController.create_post)
router.get('/:id', postController.get_post)
router.put('/:id', postController.update_post)
router.delete('/:id', postController.destroy_post)

module.exports = router