import express from 'express'
import postRoutes from './postRoutes.js'
import likeRoutes from './likeRoutes.js'

const router = express.Router()

router.use('/posts', postRoutes)
router.use('/likes', likeRoutes)

export default router