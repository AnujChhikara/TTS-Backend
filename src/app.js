import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import './middlewares/googleAuth.js'
import session from 'express-session'
import passport from 'passport'

const app = express()

app.use(
  session({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
)

app.use(passport.initialize())
app.use(passport.session())

app.use(cors())

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))

app.use(cookieParser())

//routes import

import healthRouter from './routes/health.routes.js'
import synthesis from './routes/convTemp.route.js'
import auth from './routes/auth.route.js'
import chat from './routes/chat.router.js'

//routes declaration
app.use('/api/v1/health', healthRouter)
app.use('/api/v1/synth', synthesis)
app.use('/api/v1/auth', auth)
app.use('/api/v1/chat', chat)

export default app
