import { AddSurvey } from '@/domain/usecases/survey/add-survey'
import { LoadAnswersBySurvey } from '@/domain/usecases/survey/load-answers-by-survey'
import { CheckSurveyById } from '@/domain/usecases/survey/check-survey-by-id'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModels } from '@/domain/test'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurvey.Params): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveyModels())
    }
  }
  return new LoadSurveysStub()
}

export class LoadAnswersBySurveySpy implements LoadAnswersBySurvey {
  id: string
  result = ['any_answer', 'other_answer']

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    this.id = id
    return this.result
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  result = true
  id: string

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    this.id = id
    return this.result
  }
}
