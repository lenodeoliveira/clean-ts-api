
import { DbCheckSurveyById } from './db-check-survey-by-id'
import { throwError } from './db-check-survey-by-id-protocols'
import { CheckSurveyByIdsRepositorySpy } from '@/data/test'

type SutTypes = {
  sut: DbCheckSurveyById
  checkSurveyByIdsRepositorySpy: CheckSurveyByIdsRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkSurveyByIdsRepositorySpy = new CheckSurveyByIdsRepositorySpy()
  const sut = new DbCheckSurveyById(checkSurveyByIdsRepositorySpy)

  return {
    sut,
    checkSurveyByIdsRepositorySpy
  }
}

describe('DbLoadSurveysById', () => {
  test('Should call CheckSurveyByIdsRepository', async () => {
    const { sut, checkSurveyByIdsRepositorySpy } = makeSut()
    const loadByIdSpy = jest.spyOn(checkSurveyByIdsRepositorySpy, 'checkById')
    await sut.checkById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return true CheckSurveyByIdsRepository returns true', async () => {
    const { sut } = makeSut()
    const exists = await sut.checkById('any_id')
    expect(exists).toBeTruthy()
  })

  test('Should return false CheckSurveyByIdsRepository returns false', async () => {
    const { sut, checkSurveyByIdsRepositorySpy } = makeSut()
    checkSurveyByIdsRepositorySpy.result = false
    const exists = await sut.checkById('any_id')
    expect(exists).toBeFalsy()
  })

  test('Should throw if CheckSurveyByIdsRepository throws', async () => {
    const { sut, checkSurveyByIdsRepositorySpy } = makeSut()
    jest.spyOn(checkSurveyByIdsRepositorySpy, 'checkById').mockImplementationOnce(throwError)
    const promise = sut.checkById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
