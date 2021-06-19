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
    await Favorite.create({
      UserId: helpers.getUser(req).id,
      RestaurantId: req.params.restaurantId
    })
    const restaurants = await Restaurant.findByPk(req.params.restaurantId, {
      include: { model: User, as: 'FavoritedUsers' }
    })

    res.json({
      btn: 'Remove from Favorite',
      btnClass: 'btn-danger favBtn',
      favCount: restaurants.FavoritedUsers.length
    })
  },
  removeFavorite: async (req, res) => {
    const favorite = await Favorite.findOne({
      where: {
        UserId: helpers.getUser(req).id,
        RestaurantId: req.params.restaurantId
      }
    })
    await favorite.destroy()
    const restaurants = await Restaurant.findByPk(req.params.restaurantId, {
      include: { model: User, as: 'FavoritedUsers' }
    })

    res.json({
      btn: 'Add to Favorite',
      btnClass: 'btn-primary favBtn',
      favCount: restaurants.FavoritedUsers.length
    })
  },
  likeRestaurant: async (req, res) => {
    await Like.create({
      UserId: helpers.getUser(req).id,
      RestaurantId: req.params.restaurantId
    })
    res.json({ btn: 'Unlike', btnClass: 'btn-danger likeBtn' })
  },
  unlikeRestaurant: async (req, res) => {
    const like = await Like.findOne({
      where: {
        RestaurantId: req.params.restaurantId,
        UserId: helpers.getUser(req).id
      }
    })
    await like.destroy()
    res.json({ btn: 'Like', btnClass: 'btn-primary likeBtn' })
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
