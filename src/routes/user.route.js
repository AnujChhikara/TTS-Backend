import { Router } from 'express'
import { getAllUsers, getUser, deleteUser, updateUser } from '../controllers/user.controller.js'
const router = Router()

router.route('/').get(getAllUsers)
router.route('/:id').get(getUser)
router.route('/:id').patch(updateUser)
router.route('/:id').delete(deleteUser)

export default router
