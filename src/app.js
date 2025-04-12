import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import './middlewares/googleAuth.js'
import session from 'express-session'
import passport from 'passport'

const app = express()

// Add this BEFORE your routes
app.use(
  session({
    secret: 'dslkfjwe98yru9w',
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

//routes declaration
app.use('/api/v1/health', healthRouter)
app.use('/api/v1/synth', synthesis)
app.use('/api/v1/auth', auth)

export default app
