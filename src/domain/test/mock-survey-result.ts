
import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  answer: 'any_answers',
  date: new Date(),
  surveyId: 'any_survey_id'
})

export const mockSurveyResultModel = (): SurveyResultModel => Object.assign({}, mockSaveSurveyResultParams(), { id: 'any_id' })
