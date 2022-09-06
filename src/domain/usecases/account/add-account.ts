
import { AccountModel } from '@/domain/models/account'

export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Result>
}

export namespace AddAccount {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = AccountModel
}
