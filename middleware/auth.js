module.exports = {
  authenticateUser: (req, res, next) => {
    // User must login before accessing other pages
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/signin')
  },
  authenticateAdmin: (req, res, next) => {
    // User must login before accessing other pages
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) return next()
      return res.redirect('/')
    }
    res.redirect('/signin')
  }
}
