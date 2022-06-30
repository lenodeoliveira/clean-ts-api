import app from '@/main/config/app'
// import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
// import { sign } from 'jsonwebtoken'
import request from 'supertest'

let surveyCollection: Collection
let accountCollection: Collection

// const makeAccessToken = async (): Promise<string> => {
//   const { insertedId } = await accountCollection.insertOne({
//     name: 'Any_name',
//     email: 'any_mail@gmail.com',
//     password: '123',
//     role: 'admin'
//   })
//   const id = insertedId.toHexString()
//   const accessToken = sign({ id }, env.jwtSecret)
//   await accountCollection.updateOne({
//     _id: insertedId
//   }, {
//     $set: {
//       accessToken
//     }
//   })

//   return accessToken
// }

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
  })
})
