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
    response.send('you signed up successfully!') // eventually render the home page
  })
  .catch(error => console.log(error))
})

router.post('/login', (request, response) => {
  console.log(request.body)
  db.getUserInfo(request.body.username)
  .then(userInfo => {
    console.log(userInfo);
  })
  .catch(error => {
    console.log('error::', error);
  })
    //   .then( user => {
    //       if (user) console.log('user exists')
    //       else response.render('login', {warning: 'Incorrect username or password'})
    //     })
    // .catch( error => renderError(error, response, response) )
})


module.exports = router
