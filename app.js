const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')

require('./models')

const app = express()
const port = 3000

app.engine(
  'handlebars',
  handlebars({
    defaultLayout: 'main'
  })
)
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())

app.use((req, res, next) => {
  res.locals.successMsg = req.flash('successMsg')
  res.locals.errorMsg = req.flash('errorMsg')
  next()
})

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`)
})

require('./routes')(app)

module.exports = app
