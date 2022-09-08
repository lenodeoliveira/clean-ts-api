import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { LoadSurveyByIdsRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { LoadAnswersBySurveyRepository } from '@/data/protocols/db/survey/load-answers-by-survey-repository'
import { CheckSurveyByIdsRepository } from '@/data/protocols/db/survey/check-survey-by-id-repository'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { AddSurvey } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test/'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurvey.Params): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyRepositoryStub()
}
export class LoadSurveyByIdsRepositorySpy implements LoadSurveyByIdsRepository {
  result = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<LoadSurveyByIdsRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadAnswersBySurveyRepositorySpy implements LoadAnswersBySurveyRepository {
  result = ['any_answer', 'other_answer']
  id: string

  async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    this.id = id
    return this.result
  }
}

export class CheckSurveyByIdsRepositorySpy implements CheckSurveyByIdsRepository {
  result = true
  id: string

  async checkById (id: string): Promise<CheckSurveyByIdsRepository.Result> {
    this.id = id
    return this.result
  }
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveyModels())
    }
  }

  return new LoadSurveysRepositoryStub()
}
