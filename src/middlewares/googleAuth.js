import dotenv from 'dotenv'
dotenv.config()
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../schema/user.js'
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id })
        if (!existingUser) {
          const user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
            name: profile.displayName,
          })

          return done(null, user)
        }

        return done(null, existingUser)
      } catch (error) {
        console.error('Error in Google Strategy:', error)
        return done(error, null)
      }
    },
  ),
)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

export default passport
