import { SurveyResultRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'
import { SaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result'
import { DbSaveSurveyResult } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository)
}
