import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupStaticFiles from './static-files'
import setupSwaggger from './config-swagger'

const app = express()
setupStaticFiles(app)
setupSwaggger(app)
setupMiddlewares(app)
setupRoutes(app)
export default app
