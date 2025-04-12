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
    res.redirect('/api/v1/auth/profile')
  },
)

// Profile Route
router.route('/profile').get((req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/api/v1/auth/google')
  }
  res.send(`<h2>Welcome, ${req.user.displayName}</h2>`)
})

export default router
