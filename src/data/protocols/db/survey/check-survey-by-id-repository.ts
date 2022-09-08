export interface CheckSurveyByIdsRepository {
  checkById: (id: string) => Promise<CheckSurveyByIdsRepository.Result>
}

export namespace CheckSurveyByIdsRepository {
  export type Result = boolean
}
