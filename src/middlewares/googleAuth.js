import dotenv from 'dotenv'
dotenv.config()
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import db from '../lib/prisma.js'

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await db.user.findUnique({
          where: { googleId: profile.id },
        })

        if (!user) {
          user = await db.user.create({
            data: {
              googleId: profile.id,
              email: profile.emails?.[0].value || '',
              name: profile.displayName,
              picture: profile.photos?.[0].value || '',
            },
          })
        }

        console.log(user)

        return done(null, user)
      } catch (err) {
        return done(err, null)
      }
    },
  ),
)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

export default passport
