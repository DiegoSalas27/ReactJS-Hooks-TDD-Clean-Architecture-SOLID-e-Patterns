import { SurveyModel } from '@domain/models'
import { mockSurveyListModel } from '@domain/test'
import faker from '@faker-js/faker'
import {
  HttpGetClientSpy,
  HttpStatusCode,
  UnexpectedError
} from '../authentication/remote-authentication-protocols'
import { RemoteLoadSurveyList } from './remote-load-survey-list'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)

  return {
    httpGetClientSpy,
    sut
  }
}

describe('RemoteLoadSurveyList', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { httpGetClientSpy, sut } = makeSut(url)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('Should throw UnexpectedError if HttpGetClient returns 403', async () => {
    const { httpGetClientSpy, sut } = makeSut()
    httpGetClientSpy.response = { statusCode: HttpStatusCode.forbidden }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { httpGetClientSpy, sut } = makeSut()
    httpGetClientSpy.response = { statusCode: HttpStatusCode.notFound }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { httpGetClientSpy, sut } = makeSut()
    httpGetClientSpy.response = { statusCode: HttpStatusCode.serverError }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a list of SurveyModel if HttpGetClient returns 200', async () => {
    const { httpGetClientSpy, sut } = makeSut()
    const httpResult = mockSurveyListModel()
    httpGetClientSpy.response = { statusCode: HttpStatusCode.ok, body: httpResult }
    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual(httpResult)
  })

  test('Should return no content if HttpGetClient returns 204', async () => {
    const { httpGetClientSpy, sut } = makeSut()
    httpGetClientSpy.response = { statusCode: HttpStatusCode.noContent }
    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual([])
  })
})