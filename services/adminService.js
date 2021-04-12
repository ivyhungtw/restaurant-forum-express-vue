const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

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
    const {
      name,
      tel,
      address,
      opening_hours,
      description,
      categoryId
    } = req.body
    const { file } = req
    let img
    const errors = []
    const acceptedType = ['.png', '.jpg', '.jpeg']

    if (!name || !tel || !address || !opening_hours || !description) {
      errors.push({ message: 'All fields are required!' })
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
  deleteRestaurant: async (req, res, callback) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id)
      await restaurant.destroy()
      callback({ status: 'success', message: '' })
    } catch (err) {
      console.log(err)
    }
  }
}
module.exports = adminService
