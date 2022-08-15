import { HttpRequest, HttpResponse, Controller, LoadSurveyById } from './load-survey-result-protocols'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params?.surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return null
    } catch (error: any) {
      return serverError(error)
    }
  }
}
