import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwaggger from './config-swagger'

const app = express()
setupSwaggger(app)
setupMiddlewares(app)
setupRoutes(app)
export default app
