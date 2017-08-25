const bcrypt = require('bcrypt')
const salt = 10

const encryptPassword = (password) => {
  return bcrypt.hash(password, salt)
}

const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash)
}


const renderError = function(error, response, response){
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

const createSession = (request, response, user) => {
  console.log(request.session);
  request.session.user = user
}

module.exports = {
  renderError,
  encryptPassword,
  comparePasswords,
  createSession
}
