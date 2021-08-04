const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category

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

const adminService = {
  getRestaurants: async (req, res, callback) => {
    try {
      const restaurants = await Restaurant.findAll({
        raw: true,
        order: [['id', 'DESC']],
        nest: true,
        include: [Category]
      })
      callback({ restaurants })
    } catch (err) {
      console.log(err)
    }
  },
  getRestaurant: async (req, res, callback) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id, {
        include: [Category]
      })
      callback({ restaurant: restaurant.toJSON() })
    } catch (err) {
      console.log(err)
    }
  },
  postRestaurant: async (req, res, callback) => {
    const { name, tel, address, opening_hours, description, categoryId } =
      req.body
    const { file } = req
    let img
    const errors = []
    const acceptedType = ['.png', '.jpg', '.jpeg']

    if (!name || !categoryId || !address || !description) {
      errors.push({ message: 'Please fill out all required fields.' })
    }

    // Files stored in /temp through multer middleware will be removed in the future,
    // so I need to keep the successfully uploaded image by uploading to imgur through API
    try {
      if (file) {
        const fileType = file.originalname
          .substring(file.originalname.lastIndexOf('.'))
          .toLowerCase()

        if (acceptedType.indexOf(fileType) === -1) {
          errors.push({
            message:
              'This type of image is not accepted, Please upload the image ends with png, jpg, or jpeg.'
          })
        }
      }

      if (errors.length > 0) {
        req.flash('userInput', [
          {
            name,
            tel,
            address,
            opening_hours,
            description,
            categoryId: Number(categoryId)
          }
        ])
        return callback({
          status: 'error',
          errors
        })
      }

      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID)
        img = await uploadImg(file.path)
      }

      await Restaurant.create({
        name,
        tel,
        address,
        opening_hours,
        description,
        image: file ? img.data.link : null,
        CategoryId: categoryId
      })

      return callback({
        status: 'success',
        message: 'Restaurant was created successfully'
      })
    } catch (err) {
      console.log(err)
    }
  },
  putRestaurant: async (req, res, callback) => {
    const { name, tel, address, opening_hours, description, categoryId } =
      req.body
    const { file } = req
    let img
    const acceptedType = ['.png', '.jpg', '.jpeg']
    const errors = []

    if (!name || !categoryId || !address || !description) {
      errors.push({ message: 'Please fill out all required fields.' })
    }

    try {
      if (file) {
        const fileType = file.originalname
          .substring(file.originalname.lastIndexOf('.'))
          .toLowerCase()

        if (acceptedType.indexOf(fileType) === -1) {
          errors.push({
            message:
              'This type of image is not accepted, Please upload the image ends with png, jpg, or jpeg.'
          })
        }
      }

      if (errors.length > 0) {
        req.flash('userInput', [
          {
            name,
            tel,
            address,
            opening_hours,
            description,
            categoryId: Number(categoryId)
          }
        ])
        return callback({
          status: 'error',
          errors
        })
      }

      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID)
        img = await uploadImg(file.path)
      }

      const restaurant = await Restaurant.findByPk(req.params.id)

      await restaurant.update({
        name,
        tel,
        address,
        opening_hours,
        description,
        image: file ? img.data.link : restaurant.image,
        CategoryId: categoryId
      })

      return callback({
        status: 'success',
        message: 'Restaurant was updated successfully'
      })
    } catch (err) {
      console.log(err)
    }
  },
  deleteRestaurant: async (req, res, callback) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id)
      if (!restaurant) {
        return callback({
          status: 'error',
          message: 'You can not delete a restaurant that did not exist'
        })
      }
      await restaurant.destroy()
      callback({ status: 'success', message: '' })
    } catch (err) {
      console.log(err)
    }
  },
  getUsers: async (req, res, callback) => {
    try {
      const users = await User.findAll({ raw: true })
      callback({ users, id: helpers.getUser(req).id })
    } catch (err) {
      console.log(err)
    }
  },
  toggleAdmin: async (req, res, callback) => {
    try {
      const user = await User.findByPk(req.params.id)
      const adminId = helpers.getUser(req).id

      // Prevent admins from setting themselves as user
      // if (adminId === user.id) {
      //   return res.redirect('/admin/users')
      // }

      await user.update({ ...user, isAdmin: user.isAdmin ? 0 : 1 })

      callback({
        status: 'success',
        message: `User ${user.name} was updated to ${
          user.isAdmin ? 'admin' : 'user'
        } successfully`
      })
    } catch (err) {
      console.log(err)
    }
  }
}
module.exports = adminService
