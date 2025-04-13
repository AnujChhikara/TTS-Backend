import { Router } from 'express'
import { AnalysisUserAnswer } from '../controllers/chat.controller.js'

const router = Router()

router.route('/').post(AnalysisUserAnswer)

export default router
