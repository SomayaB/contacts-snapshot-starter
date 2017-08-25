const db = require('../../db/users.js')
const router = require('express').Router()
const {renderError, encryptPassword, comparePasswords} = require('../utils')

router.get('/login', (request, response) => {
  response.render('login', {warning: ''})
})

router.get('/signup', (request, response) => {
  response.render('signup', {warning: ''})
})

router.post('/signup', (request, response) => {
  const username = request.body.username
  const password = request.body.password
  db.getAllUsers()
  .then(users => {
    users.forEach(function(user){
      if(user.username === username) {
        response.render('signup', {warning: 'This username is already taken.'})
      }
    })
    console.log('got here?');
    encryptPassword(password)
    .then(hash => {
      db.addNewUser(username, hash)
    })
    response.redirect('/') // eventually render the home page
  })
  .catch(error => console.log(error))
})

router.post('/login', (request, response) => {
  const username = request.body.username
  const password = request.body.password
  db.getUserInfo(username)
  .then(user => {
    if(user.length < 1) {
      response.render('login', {warning: 'Incorrect username or password'})
    } else {
      comparePasswords(password, user[0].password)
      .then(result => {
        if(result) {
          response.redirect('/')
        } else {
          response.render('login', {warning: 'Incorrect username or password'})
        }
      })
    }
  })
  .catch(error => {
    renderError(error, response, response)
  })
})


module.exports = router
