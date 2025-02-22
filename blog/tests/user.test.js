const { test, describe, beforeEach, before, after } = require('node:test')
const assert = require('node:assert')

const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require ('../utils/test_helper')
const supertest = require('supertest')

const api = supertest(app)

describe('when there is initially one user in the db', () => {
  beforeEach(async() => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })
})

test('creation fails with proper statuscode and message if username already taken', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'salainen',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('expected username to be unique'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

after(async () => {
  await mongoose.connection.close()
})