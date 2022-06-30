import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/'
import { makeSaveSurveyResultController } from '@/main/factories/controller/survey-result/save-survey-result/survey-result-controller-factory'
import { auth } from '@/main/middlewares/'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
