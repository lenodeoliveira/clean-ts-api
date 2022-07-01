import { SaveSurveyResultParams, SaveSurveyResultRepository, SurveyResultModel } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class SurveyResultRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const surveyResult = await surveyResultCollection.findOneAndUpdate({
      surveyId: new ObjectId(data.surveyId),
      accountId: new ObjectId(data.accountId)
    },{
      $set: {
        answer: data.answer,
        date: data.date
      }
    },
    {
      upsert: true,
      returnDocument: 'after'
    })
    return surveyResult.value && MongoHelper.map(surveyResult.value)
  }
}
