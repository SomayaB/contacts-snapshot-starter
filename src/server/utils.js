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

module.exports = {
  renderError,
  encryptPassword,
  comparePasswords
}
