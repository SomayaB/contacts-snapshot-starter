const router = require('express').Router();
const contacts = require('./contacts')
const auth = require('./auth')
const admin = require('./admin')
const DbContacts = require('../../db/contacts');
const db = require('../../db/users.js')

router.use('/auth', auth)


const isLoggedIn = (request, response, next) => {
  if (!request.session.user) {
    response.redirect('/auth/login')
  } else {
    response.locals.isLoggedIn = true
    next()
  }
}
router.use(isLoggedIn)

router.use('/contacts', contacts); // /contacts/search

router.get('/', (request, response) => {
  DbContacts.getContacts()
    .then((contacts) => {response.render('index', { contacts })})
    .catch( err => console.log('err', err) )
})

const isAdmin = (request, response, next) => {
  const role = request.session.role
  if (role === 'admin'){
    console.log('role::', role);
    response.locals.isAdmin = true
    next()
  } else {
    response.locals.isAdmin = false
    response.status(403).render('not_authorized')
  }
}
router.use(isAdmin)
router.use('/contacts', admin)

module.exports = router;
