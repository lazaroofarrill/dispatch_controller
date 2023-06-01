import './common/dependencies'
import express from 'express'
import 'reflect-metadata'
import { appRouter } from './modules/router'
import { dataSource } from './common/adapters/storage/typeorm/data-source'
import {
  typeormTransactionMiddleware
} from './common/adapters/storage/typeorm/middlewares/typeorm-transaction-middleware'

const app = express()

app.use(typeormTransactionMiddleware)
app.use(appRouter)

dataSource.initialize().then(() => {
  console.log('Starting app in port 3000')
  app.listen(3000)
})
