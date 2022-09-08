import { LoadSurveys, LoadSurveysRepository } from './db-load-surveys-protocols'
export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveyRepository: LoadSurveysRepository) {}

  async load (accountId: string): Promise<LoadSurveys.Result> {
    const surveys = await this.loadSurveyRepository.loadAll(accountId)
    return surveys
  }
}
