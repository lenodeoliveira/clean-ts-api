import { HttpRequest } from '../protocols/http'
import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors/access-denied-error'
import { AuthMiddleware } from './auth-middleware'
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccountModel } from '../../domain/models/account'

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

describe('Auth Middleware', () => {
  test('Should return 403 if no x-acess-token exists in headers', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load (accessToken: string, role?: string): Promise<AccountModel> {
        return await new Promise(resolve => resolve(makeFakeAccount()))
      }
    }
    const sut = new AuthMiddleware(new LoadAccountByTokenStub())
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should calls LoadAccountByToken with correct accessToken', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load (accessToken: string, role?: string): Promise<AccountModel> {
        return await new Promise(resolve => resolve(makeFakeAccount()))
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
