export type SurveyModel = {
  id: string
  question: string
  answers: SurveyAnsweModel[]
  date: Date
}

export type SurveyAnsweModel = {
  image?: string
  answer: string
}
