import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Lennon',
        email: 'leno.oliveira@mail.com',
        password: '12345',
        passwordConfirmation: '12345'
      })
      .expect(200)
  })
})
