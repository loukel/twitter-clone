import express from 'express'
import userController from '../controllers/userController.js'
const router = express.Router()

router.get('/', userController.get_users)
router.get('/:id', userController.get_user)

export default router