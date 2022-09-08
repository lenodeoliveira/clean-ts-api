
import { LoadSurveyByIdsRepository, LoadSurveyById } from './db-load-survey-by-id-protocols'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdsRepository) {}

  async loadById (id: string): Promise<LoadSurveyById.Result> {
    return this.loadSurveyByIdRepository.loadById(id)
  }
}
