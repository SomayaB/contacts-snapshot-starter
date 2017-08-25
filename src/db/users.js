const db = require('./db')

const getUserInfo = (username) => {
  return db.query(`
    SELECT
      *
    FROM
      users
    WHERE username=$1
    `, username)
    .catch(error => error);
}

const addNewUser = (username, password) => {
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

const getUserRole = (id) => {
  return db.one(`SELECT role FROM users WHERE id=$1`, id)
}

module.exports = {
  getUserInfo,
  addNewUser,
  getUserRole
}
