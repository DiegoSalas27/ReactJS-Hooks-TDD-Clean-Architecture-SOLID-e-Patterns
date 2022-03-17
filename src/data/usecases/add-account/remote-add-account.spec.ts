import { HttpPostClientSpy } from '@data/test'
import { EmailInUseError, UnexpectedError } from '@domain/errors'
import { mockAccountModel, mockAddAccountParams } from '@domain/test'
import { AddAccount } from '@domain/usecases'
import faker from '@faker-js/faker'
import { HttpStatusCode } from '../authentication/remote-authentication-protocols'
import { RemoteAddAccount } from './remote-add-account'

type SutTypes = {
  httpPostClientSpy: HttpPostClientSpy<AddAccount.Params, RemoteAddAccount.Model>
  sut: RemoteAddAccount
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccount.Params, RemoteAddAccount.Model>()
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

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = { statusCode: HttpStatusCode.badRequest }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = { statusCode: HttpStatusCode.serverError }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = { statusCode: HttpStatusCode.notFound }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an AccountModel if HttpPostClient returns 200', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = { statusCode: HttpStatusCode.ok, body: httpResult }
    const account = await sut.add(mockAddAccountParams())
    await expect(account).toEqual(httpResult)
  })
})
