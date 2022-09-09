import request from 'supertest'
import { Express } from 'express'
import { setupApp } from '@/main/config/app'

let app: Express

describe('Body Parser middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Lennon' })
      .expect({ name: 'Lennon' })
  })
})
