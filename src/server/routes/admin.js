const DbContacts = require('../../db/contacts')
const {renderError} = require('../utils')

const router = require('express').Router()

router.get('/new', (request, response) => {
  response.render('contacts/new')
})

router.post('/', (request, response, next) => {
  DbContacts.createContact(request.body)
  .then(contact => {
    if(contact) {
      return response.redirect(`/contacts/${contact[0].id}`)
      next()
    }
  }).catch(error => {
    renderError(error, response, response)
  })
})

router.get(`/contacts/:contactId/delete/`, (request, response, next) => {
  const contactId = request.params.contactId
  DbContacts.deleteContact(contactId)
  .then(contact => {
    if(contact){
      return response.redirect('/')
      next()
    }
  }).catch(error => {
    renderError(error, response, response)
  })
})

module.exports = router
