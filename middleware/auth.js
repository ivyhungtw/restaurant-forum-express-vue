const helpers = require('../_helpers')

module.exports = {
  authenticateUser: (req, res, next) => {
    // User must login before accessing other pages
    if (helpers.ensureAuthenticated(req)) {
      return next()
    }
    res.redirect('/signin')
  },
  authenticateAdmin: (req, res, next) => {
    // User must login before accessing other pages
    if (helpers.ensureAuthenticated(req)) {
      if (helpers.getUser(req).isAdmin) return next()
      return res.redirect('/')
    }
    res.redirect('/signin')
  }
}
