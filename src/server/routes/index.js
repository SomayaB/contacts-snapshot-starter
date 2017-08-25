const router = require('express').Router();
const contacts = require('./contacts')
const auth = require('./auth')
const DbContacts = require('../../db/contacts');

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


module.exports = router;
