import { LoadSurveyByIdsRepository } from '../../survey/load-survey-by-id/db-load-survey-by-id-protocols'
import { SurveyResultModel, LoadSurveyResult, LoadSurveyResultRepository } from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdsRepository: LoadSurveyByIdsRepository
  ) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (!surveyResult) {
      await this.loadSurveyByIdsRepository.loadById(surveyId)
    }
    return surveyResult
  }
}
