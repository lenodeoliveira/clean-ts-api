
import { DbLoadSurveyById } from './db-load-survey-by-id'
import { LoadSurveyByIdsRepository, throwError, mockSurveyModel } from './db-load-survey-by-id-protocols'
import { LoadSurveyByIdsRepositorySpy } from '@/data/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdsRepositoryStub: LoadSurveyByIdsRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdsRepositoryStub = new LoadSurveyByIdsRepositorySpy()
  const sut = new DbLoadSurveyById(loadSurveyByIdsRepositoryStub)

  return {
    sut,
    loadSurveyByIdsRepositoryStub
  }
}

describe('DbLoadSurveysById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyByIdsRepository', async () => {
    const { sut, loadSurveyByIdsRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdsRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return Survey on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.loadById('any_id')
    expect(httpResponse).toEqual(mockSurveyModel())
  })

  test('Should throw if LoadSurveyByIdsRepository throws', async () => {
    const { sut, loadSurveyByIdsRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdsRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
