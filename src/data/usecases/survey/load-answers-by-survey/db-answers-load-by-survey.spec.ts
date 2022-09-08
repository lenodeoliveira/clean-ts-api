import { DbLoadAnswersBySurvey } from './db-answers-load-by-survey'
import { throwError } from './db-answers-load-by-survey-protocols'
import { LoadAnswersBySurveyRepositorySpy } from '@/data/test'

type SutTypes = {
  sut: DbLoadAnswersBySurvey
  loadSurveyByIdsRepositorySpy: LoadAnswersBySurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdsRepositorySpy = new LoadAnswersBySurveyRepositorySpy()
  const sut = new DbLoadAnswersBySurvey(loadSurveyByIdsRepositorySpy)

  return {
    sut,
    loadSurveyByIdsRepositorySpy
  }
}

describe('DbLoadAnswersBySurvey', () => {
  test('Should call LoadAnswersBySurveyRepositorySpy', async () => {
    const { sut, loadSurveyByIdsRepositorySpy } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdsRepositorySpy, 'loadAnswers')
    await sut.loadAnswers('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return answers on success', async () => {
    const { sut, loadSurveyByIdsRepositorySpy } = makeSut()
    const result = await sut.loadAnswers('any_id')
    expect(result).toEqual([
      loadSurveyByIdsRepositorySpy.result[0],
      loadSurveyByIdsRepositorySpy.result[1]
    ])
  })

  test('Should empty array if LoadAnswersBySurveyRepositorySpy returns []', async () => {
    const { sut, loadSurveyByIdsRepositorySpy } = makeSut()
    loadSurveyByIdsRepositorySpy.result = []
    const httpResponse = await sut.loadAnswers('any_id')
    expect(httpResponse).toEqual([])
  })

  test('Should throw if LoadAnswersBySurveyRepositorySpy throws', async () => {
    const { sut, loadSurveyByIdsRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyByIdsRepositorySpy, 'loadAnswers').mockImplementationOnce(throwError)
    const promise = sut.loadAnswers('any_id')
    await expect(promise).rejects.toThrow()
  })
})
