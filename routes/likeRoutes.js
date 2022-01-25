import express from 'express'
import likeController from '../controllers/likeController.js'
const router = express.Router()

router.post('/', likeController.create_like)
router.delete('/:id', likeController.destroy_like)

export default router