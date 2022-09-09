import { setupApp } from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import { Express } from 'express'
import request from 'supertest'

let accountCollection: Collection
let app: Express

describe('Login Graphql', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('Login Query', () => {
    const query = `query {
      login (email: "johndoe@gmail.com", password: "12345") {
        accessToken
        name
      }
    }`
    test('Should return an Account on valid credentials', async () => {
      const password = await hash('12345', 12)
      await accountCollection.insertOne({
        name: 'John',
        email: 'johndoe@gmail.com',
        password
      })
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.login.accessToken).toBeTruthy()
      expect(res.body.data.login.name).toBe('John')
    })

    test('Should return UnauthorizedError on invalid credentials', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(401)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('UnauthorizedError')
    })
  })

  describe('SignUp Mutation', () => {
    const query = `mutation {
      signUp (name: "Lennon", email: "lennon.oliveira@gmail.com", password: "12345", passwordConfirmation: "12345") {
        accessToken
        name
      }
    }`

    test('Should return an Account on valid data', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.signUp.accessToken).toBeTruthy()
      expect(res.body.data.signUp.name).toBe('Lennon')
    })

    test('Should return EmailInUseError on invalid data', async () => {
      const password = await hash('12345', 12)
      await accountCollection.insertOne({
        name: 'Lennon',
        email: 'lennon.oliveira@gmail.com',
        password
      })
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(403)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('The received email is already in use')
    })
  })
})
