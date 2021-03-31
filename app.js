const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const helpers = require('./_helpers')
require('./models')
const passport = require('./config/passport')

const app = express()
const port = process.env.PORT || 3000

app.engine(
  'handlebars',
  handlebars({
    defaultLayout: 'main'
  })
)
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))
app.use('/upload', express.static(__dirname + '/upload'))

app.use((req, res, next) => {
  res.locals.successMsg = req.flash('successMsg')
  res.locals.errorMsg = req.flash('errorMsg')
  res.locals.warningMsg = req.flash('warningMsg')
  res.locals.user = helpers.getUser(req)
  next()
})

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`)
})

require('./routes')(app, passport)

module.exports = app
