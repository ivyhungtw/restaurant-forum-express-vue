const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
const Comment = db.Comment
const Restaurant = db.Restaurant

const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const helpers = require('../_helpers')

const uploadImg = path => {
  return new Promise((resolve, reject) => {
    imgur.upload(path, (err, img) => {
      if (err) {
        return reject(err)
      }
      resolve(img)
    })
  })
}

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
  },

  getUser: async (req, res) => {
    try {
      const result = await Comment.findAndCountAll({
        raw: true,
        nest: true,
        where: {
          userId: Number(req.params.id)
        },
        include: Restaurant
      })
      const count = result.count
      const comments = result.rows
      console.log('result', result)

      const user = await User.findByPk(req.params.id)

      res.render('user', {
        userProfile: user.toJSON(),
        user: helpers.getUser(req),
        count,
        comments
      })
    } catch (err) {
      console.log(err)
    }
  },
  editUser: async (req, res) => {
    const userId = helpers.getUser(req).id
    const id = req.params.id

    // Users can only edit their own profile
    if (userId !== Number(id)) {
      return res.redirect(`/users/${userId}/edit`)
    }
    try {
      const user = await User.findByPk(userId)
      res.render('edit', { user: user.toJSON() })
    } catch (err) {
      console.log(err)
    }
  },
  putUser: async (req, res) => {
    const userId = helpers.getUser(req).id
    const id = req.params.id
    const { file } = req
    let img

    // Users can only edit their own profile
    if (userId !== Number(id)) {
      return res.redirect(`/users/${userId}/edit`)
    }

    try {
      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID)
        img = await uploadImg(file.path)
      }

      const user = await User.findByPk(userId)
      await user.update({
        name: req.body.name,
        image: file ? img.data.link : user.image
      })
      res.redirect(`/users/${userId}`)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = userController
