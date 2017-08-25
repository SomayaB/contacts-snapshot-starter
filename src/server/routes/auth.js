const db = require('../../db/users.js')
const router = require('express').Router()
const {renderError, encryptPassword, comparePasswords, createSession} = require('../utils')

router.get('/login', (request, response) => {
  response.render('login', {warning: ''})
})

router.get('/signup', (request, response) => {
  response.render('signup', {warning: ''})
})

router.post('/signup', (request, response, next) => {
  const username = request.body.username
  const password = request.body.password
  if(username.length === 0 || password.length === 0){
    response.render('signup', {warning: 'You must enter a username and a password.'})
  } else {
    db.getUserInfo(username) //could use db.find()
    .then(user => {
      if (user.length > 0){
        response.render('signup', {warning: 'This username is already taken.'})
      } else {
        console.log('got here?');
        encryptPassword(password)
        .then(hash => {
          db.addNewUser(username, hash)
          .then(userInfo => {
            console.log('userinfo::', userInfo);
            createSession(request, response, userInfo)
            response.redirect('/')
          })
        })
      }
    })
    .catch(error => console.log(error))
  }
})

router.post('/login', (request, response) => {
  const username = request.body.username
  const password = request.body.password
  db.getUserInfo(username)
  .then(user => {
    console.log('user::', user[0]);
    if(user.length < 1) {
      response.render('login', {warning: 'Incorrect username or password'})
    } else {
      comparePasswords(password, user[0].password)
      .then(result => {
        if(result) {
          createSession(request, response, user[0])
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


module.exports = router;
