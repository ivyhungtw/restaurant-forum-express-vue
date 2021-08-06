const express = require('express')
// const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const cors = require('cors')
const history = require('connect-history-api-fallback')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const path = __dirname + '/dist/'

const helpers = require('./_helpers')
require('./models')
require('./utils/handlebars-helper')
const passport = require('./config/passport')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(history())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))

app.use(express.static(path))

app.get('/', (req, res) => {
  res.sendFile(path + 'index.html')
})

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`)
})

require('./routes')(app)

module.exports = app
