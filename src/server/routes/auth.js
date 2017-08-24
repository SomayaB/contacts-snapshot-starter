const router = require('express').Router()

router.get('/login', (request, response) => {
  response.render('login', {warning: ''})
})

router.get('/signup', (request, response) => {
  response.render('signup', {warning: ''})
})

module.exports = router
