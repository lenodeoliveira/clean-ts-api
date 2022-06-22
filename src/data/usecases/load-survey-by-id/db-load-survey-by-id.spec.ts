
import { DbLoadSurveyById } from './db-load-survey-by-id'
import { SurveyModel, LoadSurveyByIdsRepository } from './db-load-survey-by-id-protocols'
import MockDate from 'mockdate'

const makeFakeSurvey = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }
}

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdsRepositoryStub: LoadSurveyByIdsRepository
}

const makeLoadSurveysRepositoryStub = (): LoadSurveyByIdsRepository => {
  class LoadSurveyByIdsRepositoryStub implements LoadSurveyByIdsRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }

  return new LoadSurveyByIdsRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdsRepositoryStub = makeLoadSurveysRepositoryStub()
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
    expect(httpResponse).toEqual(makeFakeSurvey())
  })

  test('Should throw if LoadSurveyByIdsRepository throws', async () => {
    const { sut, loadSurveyByIdsRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdsRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
