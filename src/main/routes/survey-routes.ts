import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/'
import { makeAddSurveyController } from '@/main/factories/controller/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '@/main/factories/controller/survey/load-surveys/load-surveys-controller-factory'
import { auth, adminAuth } from '@/main/middlewares/'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
