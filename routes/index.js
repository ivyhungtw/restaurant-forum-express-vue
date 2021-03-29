const restController = require('../controllers/restController')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')

const { authenticateUser, authenticateAdmin } = require('../middleware/auth')

module.exports = (app, passport) => {
  app.get('/', authenticateUser, (req, res) => res.redirect('/restaurants'))
  app.get('/restaurants', authenticateUser, restController.getRestaurants)

  app.get('/admin', authenticateAdmin, (req, res) =>
    res.redirect('/admin/restaurants')
  )
  app.get(
    '/admin/restaurants',
    authenticateAdmin,
    adminController.getRestaurants
  )
  app.get(
    '/admin/restaurants/create',
    authenticateAdmin,
    adminController.createRestaurant
  )
  app.post(
    '/admin/restaurants',
    authenticateAdmin,
    adminController.postRestaurant
  )

  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)

  app.get('/signin', userController.signInPage)
  app.post(
    '/signin',
    passport.authenticate('local', {
      failureRedirect: '/signin',
      failureFlash: true
    }),
    userController.signIn
  )
  app.get('/logout', userController.logout)
}
