import { AccountModel } from '@domain/models'

export type AddAccountParams = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export interface AddAccount {
  add: (params: AddAccountParams) => Promise<AccountModel>
}
