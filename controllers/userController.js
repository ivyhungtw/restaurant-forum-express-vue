const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },

  signUp: async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const emailRule = /^\w+((-\w+)|(\.\w+)|(\+\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
    const errors = []
    // Before creating an account,
    // make sure all the required fields are correct
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: 'Please fill out all fields.' })
    }
    if (email.search(emailRule) === -1) {
      errors.push({ message: 'Please enter the correct email address.' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: 'Password and confirmPassword do not match.' })
    }
    if (errors.length > 0) {
      return res.render('signup', {
        name,
        email,
        password,
        confirmPassword,
        errors
      })
    }

    try {
      // make sure email has not been used yet
      const user = await User.findOne({ where: { email } })

      if (user) {
        req.flash(
          'warningMsg',
          `A user with ${email} already exists. Choose a different address or login directly.`
        )
        return res.redirect('/signup')
      }

      await User.create({
        name,
        email,
        password: bcrypt.hashSync(
          req.body.password,
          bcrypt.genSaltSync(10),
          null
        )
      })

      req.flash(
        'successMsg',
        `${req.body.email} register successfully! Please login.`
      )

      return res.redirect('/signin')
    } catch (error) {
      console.log(error)
    }
  },
  signInPage: (req, res) => {
    return res.render('signin', {
      errorMsg: req.flash('error')
    })
  },

  signIn: (req, res) => {
    req.flash('successMsg', 'Login successfully!')
    res.redirect('/restaurants')
  },

  logout: (req, res) => {
    req.flash('successMsg', 'Logout successfully!')
    req.logout()
    res.redirect('/signin')
  }
}

module.exports = userController
