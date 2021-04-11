const express = require('express')
const router = express.Router()

const passport = require('../config/passport')

const restController = require('../controllers/restController')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')
const categoryController = require('../controllers/categoryController.js')
const commentController = require('../controllers/commentController.js')

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const { authenticateUser, authenticateAdmin } = require('../middleware/auth')

router.get('/', authenticateUser, (req, res) => res.redirect('/restaurants'))
router.get('/restaurants', authenticateUser, restController.getRestaurants)
router.get('/restaurants/feeds', authenticateUser, restController.getFeeds)
router.get(
  '/restaurants/top',
  authenticateUser,
  restController.getTopRestaurant
)
router.get('/restaurants/:id', authenticateUser, restController.getRestaurant)
router.get(
  '/restaurants/:id/dashboard',
  authenticateUser,
  restController.getDashboard
)

router.post('/comments', authenticateUser, commentController.postComment)
router.delete(
  '/comments/:id',
  authenticateAdmin,
  commentController.deleteComment
)
router
  .route('/favorite/:restaurantId')
  .all(authenticateUser)
  .post(userController.addFavorite)
  .delete(userController.removeFavorite)
router
  .route('/like/:restaurantId')
  .all(authenticateUser)
  .post(userController.likeRestaurant)
  .delete(userController.unlikeRestaurant)
router
  .route('/following/:userId')
  .all(authenticateUser)
  .post(userController.addFollowing)
  .delete(userController.removeFollowing)

router.get('/users/top', authenticateUser, userController.getTopUser)
router.get('/users/:id', authenticateUser, userController.getUser)
router.put(
  '/users/:id',
  authenticateUser,
  upload.single('image'),
  userController.putUser
)
router.get('/users/:id/edit', authenticateUser, userController.editUser)

router.get('/admin', authenticateAdmin, (req, res) =>
  res.redirect('/admin/restaurants')
)
router.get('/admin/users', authenticateAdmin, adminController.getUsers)
router.get(
  '/admin/restaurants',
  authenticateAdmin,
  adminController.getRestaurants
)
router.get(
  '/admin/restaurants/create',
  authenticateAdmin,
  adminController.createRestaurant
)
router.post(
  '/admin/restaurants',
  authenticateAdmin,
  upload.single('image'),
  adminController.postRestaurant
)
router.put(
  '/admin/users/:id/toggleAdmin',
  authenticateAdmin,
  adminController.toggleAdmin
)
router.get(
  '/admin/restaurants/:id',
  authenticateAdmin,
  adminController.getRestaurant
)
router.get(
  '/admin/restaurants/:id/edit',
  authenticateAdmin,
  adminController.editRestaurant
)
router.put(
  '/admin/restaurants/:id',
  authenticateAdmin,
  upload.single('image'),
  adminController.putRestaurant
)
router.delete(
  '/admin/restaurants/:id',
  authenticateAdmin,
  adminController.deleteRestaurant
)

router
  .route('/admin/categories')
  .all(authenticateAdmin)
  .get(categoryController.getCategories)
  .post(categoryController.postCategories)

router
  .route('/admin/categories/:id')
  .all(authenticateAdmin)
  .get(categoryController.getCategories)
  .put(categoryController.putCategory)
  .delete(categoryController.deleteCategory)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/signin', userController.signInPage)
router.post(
  '/signin',
  passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: true
  }),
  userController.signIn
)
router.get('/logout', userController.logout)

module.exports = router
