const restController = require('../controllers/restController')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')
const categoryController = require('../controllers/categoryController.js')
const commentController = require('../controllers/commentController.js')

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const { authenticateUser, authenticateAdmin } = require('../middleware/auth')

module.exports = (app, passport) => {
  app.get('/', authenticateUser, (req, res) => res.redirect('/restaurants'))
  app.get('/restaurants', authenticateUser, restController.getRestaurants)
  app.get('/restaurants/feeds', authenticateUser, restController.getFeeds)
  app.get('/restaurants/:id', authenticateUser, restController.getRestaurant)
  app.get(
    '/restaurants/:id/dashboard',
    authenticateUser,
    restController.getDashboard
  )

  app.post('/comments', authenticateUser, commentController.postComment)
  app.delete(
    '/comments/:id',
    authenticateAdmin,
    commentController.deleteComment
  )

  app
    .route('/favorite/:restaurantId')
    .all(authenticateUser)
    .post(userController.addFavorite)
    .delete(userController.removeFavorite)

  app
    .route('/like/:restaurantId')
    .all(authenticateUser)
    .post(userController.likeRestaurant)
    .delete(userController.unlikeRestaurant)

  app.get('/users/top', authenticateUser, userController.getTopUser)
  app.get('/users/:id', authenticateUser, userController.getUser)
  app.put(
    '/users/:id',
    authenticateUser,
    upload.single('image'),
    userController.putUser
  )
  app.get('/users/:id/edit', authenticateUser, userController.editUser)

  app.get('/admin', authenticateAdmin, (req, res) =>
    res.redirect('/admin/restaurants')
  )
  app.get('/admin/users', authenticateAdmin, adminController.getUsers)
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
    upload.single('image'),
    adminController.postRestaurant
  )
  app.put(
    '/admin/users/:id/toggleAdmin',
    authenticateAdmin,
    adminController.toggleAdmin
  )
  app.get(
    '/admin/restaurants/:id',
    authenticateAdmin,
    adminController.getRestaurant
  )
  app.get(
    '/admin/restaurants/:id/edit',
    authenticateAdmin,
    adminController.editRestaurant
  )
  app.put(
    '/admin/restaurants/:id',
    authenticateAdmin,
    upload.single('image'),
    adminController.putRestaurant
  )
  app.delete(
    '/admin/restaurants/:id',
    authenticateAdmin,
    adminController.deleteRestaurant
  )

  app
    .route('/admin/categories')
    .all(authenticateAdmin)
    .get(categoryController.getCategories)
    .post(categoryController.postCategories)

  app
    .route('/admin/categories/:id')
    .all(authenticateAdmin)
    .get(categoryController.getCategories)
    .put(categoryController.putCategory)
    .delete(categoryController.deleteCategory)

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
