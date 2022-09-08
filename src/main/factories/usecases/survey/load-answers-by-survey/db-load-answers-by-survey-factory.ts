import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { DbLoadAnswersBySurvey } from '@/data/usecases/survey/load-answers-by-survey/db-answers-load-by-survey'
import { LoadAnswersBySurvey } from '@/domain/usecases/survey/load-answers-by-survey'

export const makeDbLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadAnswersBySurvey(surveyMongoRepository)
}
