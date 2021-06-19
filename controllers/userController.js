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
    let users = await User.findAll({
      include: [{ model: User, as: 'Followers' }]
    })
    const followings = req.user.Followings.map(following => following.id)

    // Clean up users data
    users = users.map(user => ({
      ...user.dataValues,
      FollowerCount: user.Followers.length,
      isFollowed: followings.includes(user.id)
    }))

    users = users.sort((a, b) => b.FollowerCount - a.FollowerCount)

    res.render('topUser', { users, id: req.user.id })
  },
  addFollowing: async (req, res) => {
    // Users can not follow themselves
    if (req.user.id === Number(req.params.userId)) {
      req.flash('errorMsg', 'You can not follow yourself.')
      return res.redirect('back')
    }
    await Followship.create({
      followingId: req.params.userId,
      followerId: req.user.id
    })
    res.redirect('back')
  },
  removeFollowing: async (req, res) => {
    const followship = await Followship.findOne({
      where: {
        followerId: req.user.id,
        followingId: req.params.userId
      }
    })
    await followship.destroy()
    res.redirect('back')
  }
}

module.exports = userController
