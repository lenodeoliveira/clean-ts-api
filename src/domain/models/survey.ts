export type SurveyModel = {
  id: string
  question: string
  answers: SurveyAnswerModel[]
  didAnswer?: boolean
  date: Date
}

export type SurveyAnswerModel = {
  image?: string
  answer: string
}
