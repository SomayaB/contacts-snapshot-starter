const db = require('./db')

const getUserInfo = function(){
  return db.query(`
    SELECT
      *
    FROM
      contacts
    `, [])
    .catch(error => error);
}

const addNewUser = function(username, password){
  return db.query(`
    INSERT INTO
      users (username, password)
    VALUES
      ($1, $2)
    RETURNING
      id
    `,
    [username, password])
    .catch(error => error);
}


module.exports = {
  getUserInfo,
  addNewUser
}
