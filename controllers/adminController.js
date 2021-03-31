const db = require('../models')
const Restaurant = db.Restaurant

const fs = require('fs').promises
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminController = {
  getRestaurants: async (req, res) => {
    const restaurants = await Restaurant.findAll({ raw: true })
    return res.render('admin/restaurants', { restaurants })
  },
  createRestaurant: (req, res) => {
    return res.render('admin/create')
  },
  postRestaurant: async (req, res) => {
    const { name, tel, address, opening_hours, description } = req.body
    const { file } = req
    const errors = []
    if (!name || !tel || !address || !opening_hours || !description) {
      errors.push({ message: 'All fields are required!' })
      return res.render('admin/create', {
        errors,
        name,
        tel,
        address,
        opening_hours,
        description
      })
    }

    // Files stored in /temp through multer middleware will be removed in the future,
    // so I need to keep the successfully uploaded image by uploading to imgur through API
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Restaurant.create({
          name,
          tel,
          address,
          opening_hours,
          description,
          image: file ? img.data.link : null
        }).then(restaurant => {
          req.flash('successMsg', 'Restaurant was created successfully')
          return res.redirect('/admin/restaurants')
        })
      })
    } else {
      return Restaurant.create({
        name,
        tel,
        address,
        opening_hours,
        description,
        image: null
      }).then(restaurant => {
        req.flash('successMsg', 'Restaurant was created successfully')
        return res.redirect('/admin/restaurants')
      })
    }

    // try {
    //   // Files stored in /temp through multer middleware will be removed in the future,
    //   // so I need to keep the successfully uploaded image in /upload
    //   if (file) {
    //     const data = await fs.readFile(file.path)
    //     await fs.writeFile(`upload/${file.originalname}`, data)
    //   }

    //   await Restaurant.create({
    //     name,
    //     tel,
    //     address,
    //     opening_hours,
    //     description,
    //     image: file ? `/upload/${file.originalname}` : null
    //   })

    //   req.flash('successMsg', 'Restaurant was created successfully')
    //   return res.redirect('/admin/restaurants')
    // } catch (err) {
    //   console.log(err)
    // }
  },
  getRestaurant: async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id, { raw: true })
    return res.render('admin/restaurant', { restaurant })
  },
  editRestaurant: async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id, { raw: true })
    return res.render('admin/create', { restaurant })
  },
  putRestaurant: async (req, res) => {
    const { name, tel, address, opening_hours, description } = req.body
    const { file } = req

    if (!name || !tel || !address || !opening_hours || !description) {
      req.flash('errorMsg', 'All fields are required!')
      return res.redirect('back')
    }

    try {
      if (file) {
        const data = await fs.readFile(file.path)
        await fs.writeFile(`upload/${file.originalname}`, data)
      }

      const restaurant = await Restaurant.findByPk(req.params.id)
      await restaurant.update({
        name,
        tel,
        address,
        opening_hours,
        description,
        image: file ? `/upload/${file.originalname}` : restaurant.image
      })

      req.flash('successMsg', 'restaurant was updated successfully!')
      res.redirect('/admin/restaurants')
    } catch (err) {
      console.log(err)
    }
  },
  deleteRestaurant: async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.destroy()
    res.redirect('/admin/restaurants')
  }
}

module.exports = adminController
