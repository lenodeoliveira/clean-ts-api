import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepository, throwError, mockSurveyModels } from './db-load-surveys-protocols'
import { mockLoadSurveysRepository } from '@/data/test'
import MockDate from 'mockdate'

type SutTypes = {
  loadSurveysRepositoryStub: LoadSurveysRepository
  sut: DbLoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)

  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.load()
    expect(httpResponse).toEqual(mockSurveyModels())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
