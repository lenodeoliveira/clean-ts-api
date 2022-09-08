import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { DbCheckSurveyById } from '@/data/usecases/survey/load-survey-by-id/db-check-survey-by-id'
import { CheckSurveyById } from '@/domain/usecases/survey/check-survey-by-id'

export const makeDbCheckSurveyById = (): CheckSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbCheckSurveyById(surveyMongoRepository)
}
