export interface SurveyModel {
  id: string
  question: string
  answers: SurveyAnsweModel[]
  date: Date
}

export interface SurveyAnsweModel {
  image?: string
  answer: string
}
