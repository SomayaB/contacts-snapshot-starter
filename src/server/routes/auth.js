const db = require('../../db/users.js')
const router = require('express').Router()
const {renderError} = require('../utils')

router.get('/login', (request, response) => {
  response.render('login', {warning: ''})
})

router.get('/signup', (request, response) => {
  response.render('signup', {warning: ''})
})

router.post('/signup', (request, response) => {
  const newUsername = request.body.username
  const newPassword = request.body.password
  db.getAllUsers()
  .then(users => {
    users.forEach(function(user){
      if(user.username === newUsername) {
        response.render('signup', {warning: 'This username is already taken.'})
      }
    })
    console.log('got here?');
    db.addNewUser(newUsername, newPassword)
    response.redirect('/') // eventually render the home page
  })
  .catch(error => console.log(error))
})

router.post('/login', (request, response) => {
  const username = request.body.username
  const password = request.body.password
  console.log(username);
  db.getUserInfo(username)
  .then(user => {
    if(user.length < 1) { //checks for empty object. wrong username. Doesn't check for password match yet. will check with bcrypt comapre.
      response.render('login', {warning: 'Incorrect username or password'})
    } else {
    response.redirect('/') //maybe index instead
    }
  })
  .catch(error => {
    renderError(error, response, response)
  })
})


module.exports = router
