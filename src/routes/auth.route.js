import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.route('/google').get(
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
)

router.route('/google/callback').get(
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/')
  },
)

router.route('/check').get((req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      status: 'success',
      user: req.user,
    })
  } else {
    res.status(401).json({
      status: 'fail',
      message: 'User not authenticated',
    })
  }
})

export default router
