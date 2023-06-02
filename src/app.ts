import './common/dependencies'
import express from 'express'
import 'reflect-metadata'
import { appRouter } from './modules/router'
import { typeormTransactionMiddleware } from './common/adapters/storage/typeorm/middlewares/typeorm-transaction-middleware'
import { Container } from 'typedi'
import { DataSource } from 'typeorm'
import { Logger } from './common/logging/logger'
import {
  minioClient,
  S3_BUCKET_TOKEN
} from './common/adapters/storage/minio/minio-client'

const app = express()

app.use(typeormTransactionMiddleware)
app.use(appRouter)

const dataSource = Container.get(DataSource)
const consoleLogger = new Logger()
consoleLogger.info('Initializing DataSource')
dataSource
  .initialize()
  .then(() => consoleLogger.info('DataSource initialized'))
  .then(async () => {
    consoleLogger.info('Initializing S3')

    const s3Bucket = Container.get<string>(S3_BUCKET_TOKEN)
    const bucketExists = await minioClient.bucketExists(s3Bucket)
    if (!bucketExists) {
      await minioClient.makeBucket(s3Bucket)
      consoleLogger.info(`Bucket "${s3Bucket}" created`)
    }
    consoleLogger.info('S3 Initialized')
  })
  .then(() => {
    consoleLogger.info('Starting app in port 3000')
    app.listen(3000)
  })
