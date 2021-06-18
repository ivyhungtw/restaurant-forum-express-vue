const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
const Comment = db.Comment
const Restaurant = db.Restaurant
const Favorite = db.Favorite
const Like = db.Like
const Followship = db.Followship

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

const userService = {
  signUp: async (req, res, callback) => {
    console.log('----- userService - signup -----')
    const { name, email, password, confirmPassword } = req.body
    const emailRule =
      /^\w+((-\w+)|(\.\w+)|(\+\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
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
      return callback({
        status: 'error',
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
        return callback({
          status: 'error',
          message: `A user with ${email} already exists. Choose a different address or login directly.`
        })
      }

      await User.create({
        name,
        email,
        password: bcrypt.hashSync(
          req.body.password,
          bcrypt.genSaltSync(10),
          null
        ),
        image: 'https://i.imgur.com/q6bwDGO.png'
      })

      return callback({
        status: 'success',
        message: `${req.body.email} register successfully! Please login.`
      })
    } catch (error) {
      console.log(error)
    }
  },

  getUser: async (req, res, callback) => {
    try {
      const userProfile = (
        await User.findOne({
          include: [
            {
              model: User,
              as: 'Followers',
              attributes: ['id', 'image']
            },
            { model: User, as: 'Followings', attributes: ['id', 'image'] },
            {
              model: Restaurant,
              as: 'FavoritedRestaurants',
              attributes: ['id', 'image']
            },
            {
              model: Comment,
              include: [{ model: Restaurant, attributes: ['id', 'image'] }]
            }
          ],
          where: {
            id: Number(req.params.id)
          },
          attributes: ['id', 'name', 'email', 'image']
        })
      ).toJSON()

      // Users can leave many comments on a restaurants,
      // but we wanna show restaurants commented by the user without duplication on the profile page
      const commentRestaurants = []
      const restaurantId = {}
      userProfile.Comments.forEach(comment => {
        if (!restaurantId[comment.RestaurantId]) {
          restaurantId[comment.RestaurantId] = 1
          commentRestaurants.push(comment.Restaurant)
        }
      })

      return callback({
        userProfile,
        userId: helpers.getUser(req).id,
        commentRestaurants,
        followers: userProfile.Followers,
        followings: userProfile.Followings,
        favRestaurants: userProfile.FavoritedRestaurants
      })
    } catch (err) {
      console.log(err)
    }
  },

  editUser: async (req, res, callback) => {
    const userId = helpers.getUser(req).id
    const id = req.params.id

    // Users can only edit their own profile
    if (userId !== Number(id)) {
      return callback({
        status: 'error',
        message: 'You can only edit your own profile.',
        userId
      })
    }
    try {
      const user = await User.findByPk(userId)
      return callback({ user: user.toJSON() })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = userService