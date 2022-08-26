const db = require('../../data/dbConfig')

async function add(user) {
  const [id] = await db('users')
    .insert(user)
  return getById(id)
}

//returns an array of all users that match because not necessarily just one
async function getBy(filter) {
  return db('users')
  .where(filter)
}

async function getById(id) {
  return db('users')
    .where('id', id)
    .first()
}

function getByUserName(username) {
  return db('users')
    .where({username})
    .first()
}

module.exports = {
  add,
  getById,
  getBy,
  getByUserName
}