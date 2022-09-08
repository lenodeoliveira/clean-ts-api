import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { LoadAnswersBySurveyRepository } from '@/data/protocols/db/survey/load-answers-by-survey-repository'
import { LoadSurveyByIdsRepository, CheckSurveyByIdsRepository } from '@/data/usecases/survey/check-survey-by-id/db-check-survey-by-id-protocols'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurvey } from '@/domain/usecases/survey/add-survey'
import { MongoHelper, QueryBuilder } from '@/infra/db/mongodb/helpers'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdsRepository, CheckSurveyByIdsRepository, LoadAnswersBySurveyRepository {
  async add (surveyData: AddSurvey.Params): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const { insertedId } = await surveyCollection.insertOne(surveyData)
    await surveyCollection.findOne(insertedId)
  }

  async loadAll (accountId: string): Promise<SurveyModel[]> {
    const surveysCollection = await MongoHelper.getCollection('surveys')

    const query = new QueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result'
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [{
            $size: {
              $filter: {
                input: '$result',
                as: 'item',
                cond: {
                  $eq: ['$$item.accountId', new ObjectId(accountId)]
                }
              }
            }
          }, 1]
        }
      })
      .build()
    const surveys = await surveysCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<LoadSurveyByIdsRepository.Result> {
    const surveysCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveysCollection.findOne({
      _id: new ObjectId(id)
    })
    return survey && MongoHelper.map(survey)
  }

  async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    const surveysCollection = await MongoHelper.getCollection('surveys')
    const query = new QueryBuilder()
      .match({
        _id: new ObjectId(id)
      })
      .project({
        _id: 0,
        answers: '$answers.answer'
      })
      .build()
    const surveys = await surveysCollection.aggregate(query).toArray()
    return surveys[0]?.answers || []
  }

  async checkById (id: string): Promise<CheckSurveyByIdsRepository.Result> {
    const surveysCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveysCollection.findOne({
      _id: new ObjectId(id)
    }, {
      projection: {
        _id: 1
      }
    })
    return survey !== null
  }
}
