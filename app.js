const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')

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

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`)
})

require('./routes')(app)

module.exports = app
