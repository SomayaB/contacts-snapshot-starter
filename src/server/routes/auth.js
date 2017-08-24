const users = require('../../db/users.js')
const router = require('express').Router()

router.get('/login', (request, response) => {
  response.render('login', {warning: ''})
})

router.get('/signup', (request, response) => {
  response.render('signup', {warning: ''})
})

router.post('/signup', (request, response) => {
  const username = request.body.username
  const password = request.body.password
  users.addNewUser(username, password)
  response.send('you signed up successfully!')
})

module.exports = router
