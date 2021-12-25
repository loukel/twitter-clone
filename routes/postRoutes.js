import express from 'express'
import postController from '../controllers/postController.js'
const router = express.Router()

router.get('/', postController.get_posts)
router.post('/', postController.create_post)
router.get('/:id', postController.get_post)
router.delete('/:id', postController.destroy_post)

export default router