const express = require('express')
const bodyParser = require('body-parser')
const dbContacts = require('./db/contacts')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const app = express()
const {renderError} = require('./server/utils')
const routes = require('./server/routes');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use((request, response, next) => {
  response.locals.query = ''
  next()
})

app.use(session({
  store: new pgSession({
    conString: 'postgres://localhost:5432/contacts_development'
  }),
  secret: 'helloworld',
  resave: false,
  saveUninitialized: false,
  cooke: { maxAge: 1 * 24 * 60 * 60 * 1000 }
}))

app.use('/', routes)

app.use((request, response) => {
  response.render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
