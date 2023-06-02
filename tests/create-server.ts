import express from 'express'
import { appRouter } from '../src/modules/router'
import {
  typeormTransactionMiddleware
} from '../src/common/adapters/storage/typeorm/middlewares/typeorm-transaction-middleware'
import { Container } from 'typedi'
import { DataSource } from 'typeorm'
import { minioClient } from '../src/common/adapters/storage/minio/minio-client'
import {
  S3_BUCKET_TOKEN
} from '../src/common/adapters/storage/minio/common-options'

const dataSource = Container.get(DataSource)

export const scaffoldTests = () => {

  afterAll(() => {
    return cleanUpS3()
  })

  async function cleanUpS3() {
    const s3Bucket = Container.get<string>(S3_BUCKET_TOKEN)
    if (await minioClient.bucketExists(s3Bucket)) {
      const bucketObjectsStream = await minioClient.listObjectsV2(s3Bucket)

      const itemDeletePromises: Promise<void>[] = []
      bucketObjectsStream.on('data', (item) => {
        itemDeletePromises.push(minioClient.removeObject(s3Bucket, item.name))
      })

      await new Promise(async (resolve, reject) => {
        bucketObjectsStream.on('end', async () => {
          await Promise.all(itemDeletePromises)
          resolve(null)
        })
        bucketObjectsStream.on('error', reject)
      })

      await minioClient.removeBucket(s3Bucket)
    }
    await minioClient.makeBucket(s3Bucket)
  }

  async function createServer() {
    await dataSource.initialize()
    await cleanUpS3()

    const app = express()
    app.use(typeormTransactionMiddleware)
    app.use(appRouter)
    return app
  }

  return { createServer, cleanUpS3 }
}

