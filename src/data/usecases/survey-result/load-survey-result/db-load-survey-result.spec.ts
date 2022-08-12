import { DbLoadSurveyResult } from './db-load-survey-result'
import { LoadSurveyResultRepository } from './db-load-survey-result-protocols'
import { mockLoadSurveyResultRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)

  return {
    sut,
    loadSurveyResultRepositoryStub
  }
}

describe('DbLoadSurveyResult Usecase', () => {
  test('Should call LoadSurveyResultRepository', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loaBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loaBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
