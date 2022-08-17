import { Controller, HttpRequest, HttpResponse, LoadSurveys, ok, serverError, noContent } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurvey: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurvey.load(httpRequest.accountId)
      return surveys.length ? ok(surveys) : noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
