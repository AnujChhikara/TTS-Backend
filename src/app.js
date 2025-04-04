import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors())

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))

app.use(cookieParser())

//routes import

import healthRouter from './routes/health.routes.js'
import synthesis from './routes/convTemp.route.js'

//routes declaration
app.use('/api/v1/health', healthRouter)
app.use('/api/v1/synth', synthesis)

export default app
