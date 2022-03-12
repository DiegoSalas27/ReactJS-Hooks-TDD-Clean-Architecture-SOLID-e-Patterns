import { HttpPostClientSpy } from '@data/test'
import { EmailInUseError } from '@domain/errors'
import { mockAddAccountParams } from '@domain/test'
import { AddAccountParams } from '@domain/usecases'
import faker from '@faker-js/faker'
import { AccountModel, HttpStatusCode } from '../authentication/remote-authentication-protocols'
import { RemoteAddAccount } from './remote-add-account'

type SutTypes = {
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
  sut: RemoteAddAccount
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return {
    httpPostClientSpy,
    sut
  }
}

describe('RemoteAddAccount UseCase', () => {
  test('Should call httpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { httpPostClientSpy, sut } = makeSut(url)
    await sut.add(mockAddAccountParams())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call httpPostClient with correct body', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(httpPostClientSpy.body).toEqual(addAccountParams)
  })

  test('Should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = { statusCode: HttpStatusCode.forbidden }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })
})
