import { SurveyAnsweModel } from '@/domain/models/survey'
export type AddSurveyModel = {
  question: string
  answers: SurveyAnsweModel[]
  date: Date
}

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>
}
