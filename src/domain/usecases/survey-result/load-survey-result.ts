import { SurveyResultModel } from '@/domain/models/survey-result'

export interface LoadSurveyResult {
  save: (surveyId: string) => Promise<SurveyResultModel>
}
