import express from 'express'
import postRoutes from './postRoutes.js'
import likeRoutes from './likeRoutes.js'
import userRoutes from './userRoutes.js'

const router = express.Router()

router.use('/posts', postRoutes)
router.use('/likes', likeRoutes)
router.use('/users', userRoutes)

export default router