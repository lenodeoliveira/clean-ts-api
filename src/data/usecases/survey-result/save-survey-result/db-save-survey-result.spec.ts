import { DbSaveSurveyResult } from './db-save-survey-result'
import { SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResultParams } from './db-save-survey-result-protocols'
import MockDate from 'mockdate'

const makeFakeSurveyResultData = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  answer: 'any_answers',
  date: new Date(),
  surveyId: 'any_survey_id'
})
const makeFakeSurveyResult = (): SurveyResultModel => ({
  accountId: 'any_account_id',
  answer: 'any_answers',
  date: new Date(),
  id: 'any_id',
  surveyId: 'any_survey_id'

})

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve(makeFakeSurveyResult()))
    }
  }

  return new SaveSurveyResultRepositoryStub()
}

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)

  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const surveyData = makeFakeSurveyResultData()
    await sut.save(surveyData)
    expect(saveSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))
    const promise = sut.save(makeFakeSurveyResultData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(makeFakeSurveyResultData())
    expect(surveyResult).toEqual(makeFakeSurveyResult())
  })
})
