const Users = require('./api/users/users-model')
const db = require('./data/dbConfig')

test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
  await db('users')
    .insert([
      { username: "johndoe", password: "$2y$10$9860d8e2e5871210786b9ueYMuxOLbd6HST6fxrh6RCDH1h6knItG"},
      { username: "peggysue", password: "$2y$10$9860d8e2e5871210786b9ueYMuxOLbd6HST6fxrh6RCDH1h6knIta"},
      { username: "darthvader", password: "$2y$10$9860d8e2e5871210786b9ueYMuxOLbd6HST6fxrh6RCDH1h6knItz"}
    ])
})

afterAll(async () => {
  await db.destroy()
})

describe('Add function', () => {
  test('returns newly added record', async () => {
    let user = await Users.add({ username: "testusername", password: "$2y$10$9860d8e2e5871210786b9ueYMuxOLbd6HST6fxrh6RCDH1h6knItz"})
    expect(user).toMatchObject({ username: "testusername", password: "$2y$10$9860d8e2e5871210786b9ueYMuxOLbd6HST6fxrh6RCDH1h6knItz", id: 4})
  })
  test('is added to the database just once', async () => {
    await Users.add({ username: "testusername", password: "$2y$10$9860d8e2e5871210786b9ueYMuxOLbd6HST6fxrh6RCDH1h6knItz"})
    let user = await db('users').where('id', 4).first()
    expect(user).toMatchObject({ username: "testusername", password: "$2y$10$9860d8e2e5871210786b9ueYMuxOLbd6HST6fxrh6RCDH1h6knItz", id: 4})
    const users = await db('users')
    expect(users).toHaveLength(4)
  })
})

describe('getById', () => {
  test.todo('returns the user with that id')
  test.todo('does not add a user to the database')
})

describe('getBy', () => {
  test.todo('returns the user with that filter')
  test.todo('does not add a user to the database')
})

describe('getByUsername', () => {
  test.todo('returns the user with that username')
  test.todo('does not add a user to the database')
})