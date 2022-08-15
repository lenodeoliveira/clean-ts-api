import { makeSaveSurveyResultController } from '@/main/factories/controller/survey-result/save-survey-result/survey-result-controller-factory'
import { makeLoadSurveyResultController } from '@/main/factories/controller/survey-result/load-survey-result/load-survey-result-controller-factory'
import { adaptRoute } from '@/main/adapters/'
import { Router } from 'express'
import { auth } from '@/main/middlewares/'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
