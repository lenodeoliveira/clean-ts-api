import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurvey: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurvey.load()
    return await new Promise(resolve => resolve(null))
  }
}
