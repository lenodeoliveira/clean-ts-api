import { Controller, HttpResponse, LoadSurveys, ok, serverError, noContent } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurvey: LoadSurveys) {}

  async handle (request: LoadSurveysController.Request): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurvey.load(request.accountId)
      return surveys.length ? ok(surveys) : noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace LoadSurveysController {
  export type Request = {
    accountId: string
  }
}
