import { HttpPostClient } from '@data/protocols/http'
import { AddAccount, AddAccountParams } from '@domain/usecases'
import { AccountModel, AuthenticationParams } from '../authentication/remote-authentication-protocols'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params })
    return null
  }
}