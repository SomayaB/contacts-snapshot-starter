const router = require('express').Router();
const contacts = require('./contacts')
const auth = require('./auth')
const DbContacts = require('../../db/contacts');

router.use('/auth', auth)
router.get('/login', (request, response) => {
  response.render('login', {warning: ''})
})

router.get('/signup', (request, response) => {
  response.render('signup', {warning: ''})
})


router.use('/contacts', contacts); // /contacts/search

router.get('/', (request, response) => {
  DbContacts.getContacts()
    .then((contacts) => {response.render('index', { contacts })})
    .catch( err => console.log('err', err) )
})


module.exports = router;
