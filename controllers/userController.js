const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
const Comment = db.Comment
const Restaurant = db.Restaurant
const Favorite = db.Favorite
const Like = db.Like
const Followship = db.Followship

const userService = require('../services/userService')

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
    userService.signUp(req, res, data => {
      if (data['status'] === 'error') {
        if (data['errors']) {
          return res.render('signup', data)
        }
        req.flash('warningMsg', data['message'])
        return res.redirect('/signup')
      }
      req.flash('successMsg', data['message'])
      res.redirect('/signin')
    })
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
    userService.getUser(req, res, data => {
      res.render('user', data)
    })
  },

  editUser: async (req, res) => {
    userService.editUser(req, res, data => {
      if (data['status'] === 'error') {
        req.flash('errorMsg', data['message'])
        return res.redirect(`/users/${data['userId']}/edit`)
      }
      res.render('edit', data)
    })
  },

  putUser: async (req, res) => {
    userService.putUser(req, res, data => {
      if (data['status'] === 'error') {
        if (data['userId']) {
          req.flash('errorMsg', data['message'])
          return res.redirect(`/users/${data['userId']}/edit`)
        }
        req.flash('errorMsg', data['message'])
        return res.redirect('back')
      }
      return res.redirect(`/users/${data['userId']}/edit`)
    })
  },

  addFavorite: async (req, res) => {
    userService.addFavorite(req, res, data => {
      return res.json(data)
    })
  },

  removeFavorite: async (req, res) => {
    userService.removeFavorite(req, res, data => {
      return res.json(data)
    })
  },

  likeRestaurant: async (req, res) => {
    userService.likeRestaurant(req, res, data => {
      return res.json(data)
    })
  },

  unlikeRestaurant: async (req, res) => {
    userService.unlikeRestaurant(req, res, data => {
      return res.json(data)
    })
  },

  getTopUser: async (req, res) => {
    userService.getTopUser(req, res, data => {
      return res.render('topUser', data)
    })
  },

  addFollowing: async (req, res) => {
    userService.addFollowing(req, res, data => {
      if (data['status'] === 'error') {
        req.flash('errorMsg', data['message'])
      }
      return res.redirect('back')
    })
  },

  removeFollowing: async (req, res) => {
    userService.removeFollowing(req, res, data => {
      return res.redirect('back')
    })
  }
}

module.exports = userController
