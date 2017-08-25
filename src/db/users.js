const db = require('./db')

const getUserInfo = function(username){
  return db.query(`
    SELECT
      *
    FROM
      users
    WHERE username=$1
    `, [username])
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

const getAllUsers = function(){
  return db.query(`SELECT * FROM users`)
}

module.exports = {
  getUserInfo,
  addNewUser,
  getAllUsers
}
