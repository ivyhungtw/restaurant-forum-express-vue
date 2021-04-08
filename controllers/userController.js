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
      req.flash('errorMsg', 'You can only edit your own profile.')
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
    const acceptedType = ['.png', '.jpg', '.jpeg']

    // Users can only edit their own profile
    if (userId !== Number(id)) {
      req.flash('errorMsg', 'You can only edit your own profile.')
      return res.redirect(`/users/${userId}/edit`)
    }

    if (!req.body.name || req.body.name.length > 25) {
      req.flash(
        'errorMsg',
        'Name can not be empty or longer than 25 characters.'
      )
      return res.redirect('back')
    }

    try {
      if (file) {
        const fileType = file.originalname
          .substring(file.originalname.lastIndexOf('.'))
          .toLowerCase()

        if (acceptedType.indexOf(fileType) === -1) {
          req.flash(
            'errorMsg',
            'This type of image is not accepted, Please upload the image ends with png, jpg, or jpeg. '
          )
          return res.redirect('back')
        }

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
  },
  addFavorite: async (req, res) => {
    await Favorite.create({
      UserId: helpers.getUser(req).id,
      RestaurantId: req.params.restaurantId
    })
    res.redirect('back')
  },
  removeFavorite: async (req, res) => {
    const favorite = await Favorite.findOne({
      where: {
        UserId: helpers.getUser(req).id,
        RestaurantId: req.params.restaurantId
      }
    })
    await favorite.destroy()
    res.redirect('back')
  },
  likeRestaurant: async (req, res) => {
    await Like.create({
      UserId: helpers.getUser(req).id,
      RestaurantId: req.params.restaurantId
    })
    res.redirect('back')
  },
  unlikeRestaurant: async (req, res) => {
    const like = await Like.findOne({
      where: {
        RestaurantId: req.params.restaurantId,
        UserId: helpers.getUser(req).id
      }
    })
    await like.destroy()
    res.redirect('back')
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
