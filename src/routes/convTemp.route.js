import { Router } from 'express'
import { synth } from '../controllers/synth.controller.js'

const router = Router()

router.route('/').post(synth)

export default router
