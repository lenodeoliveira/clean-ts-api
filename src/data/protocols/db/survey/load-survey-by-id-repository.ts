import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveyByIdsRepository {
  loadById: (id: string) => Promise<SurveyModel>
}
