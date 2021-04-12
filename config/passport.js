const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User
const Restaurant = db.Restaurant

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        // Email should exist in users table
        const user = await User.findOne({ where: { email } })

        if (!user) {
          return done(null, false, {
            message: 'That email is not registered!'
          })
        }

        // Password should match the email
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
          return done(null, false, {
            message: 'Incorrect Password'
          })
        }

        return done(null, user)
      } catch (err) {
        done(err, false)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findByPk(id, {
      include: [
        { model: Restaurant, as: 'FavoritedRestaurants' },
        { model: Restaurant, as: 'LikedRestaurants' },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    })
    user = user.toJSON()
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

// JWT
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.JWT_SECRET

const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
  const user = await User.findByPk(jwt_payload.id, {
    include: [
      { model: db.Restaurant, as: 'FavoritedRestaurants' },
      { model: db.Restaurant, as: 'LikedRestaurants' },
      { model: User, as: 'Followers' },
      { model: User, as: 'Followings' }
    ]
  })
  if (!user) return next(null, false)
  return next(null, user)
})
passport.use(strategy)

module.exports = passport
