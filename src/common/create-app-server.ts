import express from 'express'
import { typeormTransactionMiddleware } from './adapters/storage/typeorm/middlewares/typeorm-transaction-middleware'
import { appRouter } from '../modules/router'

export const createAppServer = () => {
  const app = express()
  app.use(typeormTransactionMiddleware)
  app.use(appRouter)
  return app
}
