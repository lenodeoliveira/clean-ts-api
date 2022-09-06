import { AccountModel } from '@/domain/models/account'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { AuthenticationParams } from '@/domain/usecases/account/authentication'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel => Object.assign({}, mockAddAccountParams(), {
  id: 'any_id'
})

export const mockFakeAuthentication = (): AuthenticationParams => ({
  email: 'any_mail@mail.com',
  password: 'any_password'
})
