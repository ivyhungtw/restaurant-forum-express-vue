const bcrypt = require('bcryptjs')
const db = require('../../models')
const User = db.User

const userService = require('../../services/userService')

// JWT
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const userController = {
  signIn: async (req, res) => {
    // Make sure all the fields are filled out
    if (!req.body.email || !req.body.password) {
      return res.json({
        status: 'error',
        message: 'All fields are required.'
      })
    }

    // Check email and password
    const username = req.body.email
    const password = req.body.password

    const user = await User.findOne({ where: { email: username } })

    if (!user) {
      return res
        .status(401)
        .json({ status: 'error', message: 'That email is not registered.' })
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ status: 'error', message: 'Incorrect Password' })
    }

    // Sign token
    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return res.json({
      status: 'success',
      message: 'ok',
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    })
  },

  signUp: async (req, res) => {
    userService.signUp(req, res, data => {
      return res.json(data)
    })
  },

  getUser: async (req, res) => {
    userService.getUser(req, res, data => {
      return res.json(data)
    })
  },

  editUser: async (req, res) => {
    userService.editUser(req, res, data => {
      return res.json(data)
    })
  },

  putUser: async (req, res) => {
    userService.putUser(req, res, data => {
      return res.json(data)
    })
  }
}

module.exports = userController
