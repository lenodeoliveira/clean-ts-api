import { DbLoadAnswersBySurvey } from './db-answers-load-by-survey'
import { LoadSurveyByIdsRepository, throwError } from './db-load-survey-by-id-protocols'
import { LoadSurveyByIdsRepositorySpy } from '@/data/test'
import { SurveyAnswerModel } from '@/domain/models/survey'

type SutTypes = {
  sut: DbLoadAnswersBySurvey
  loadSurveyByIdsRepositorySpy: LoadSurveyByIdsRepository
  answers: SurveyAnswerModel[]
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdsRepositorySpy = new LoadSurveyByIdsRepositorySpy()
  const answers = loadSurveyByIdsRepositorySpy.result.answers
  const sut = new DbLoadAnswersBySurvey(loadSurveyByIdsRepositorySpy)

  return {
    sut,
    loadSurveyByIdsRepositorySpy,
    answers
  }
}

describe('DbLoadAnswersBySurvey', () => {
  test('Should call LoadSurveyByIdsRepository', async () => {
    const { sut, loadSurveyByIdsRepositorySpy } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdsRepositorySpy, 'loadById')
    await sut.loadAnswers('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return answers on success', async () => {
    const { sut, answers } = makeSut()
    const httpResponse = await sut.loadAnswers('any_id')
    expect(httpResponse).toEqual([
      answers[0].answer,
      answers[1].answer
    ])
  })

  test('Should empty array if LoadSurveyByIdsRepository returns null', async () => {
    const { sut, loadSurveyByIdsRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyByIdsRepositorySpy, 'loadById').mockImplementationOnce(null)
    const httpResponse = await sut.loadAnswers('any_id')
    expect(httpResponse).toEqual([])
  })

  test('Should throw if LoadSurveyByIdsRepository throws', async () => {
    const { sut, loadSurveyByIdsRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyByIdsRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadAnswers('any_id')
    await expect(promise).rejects.toThrow()
  })
})
