import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveyByIdsRepository {
  loadById: (id: string) => Promise<LoadSurveyByIdsRepository.Result>
}

export namespace LoadSurveyByIdsRepository {
  export type Result = SurveyModel
}
