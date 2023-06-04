import express from 'express'
import { appRouter } from '../src/modules/router'
import { typeormTransactionMiddleware } from '../src/common/adapters/storage/typeorm/middlewares/typeorm-transaction-middleware'
import { Container } from 'typedi'
import { DataSource } from 'typeorm'
import {
  minioClient,
  S3_BUCKET_TOKEN,
} from '../src/common/adapters/storage/minio/minio-client'
import { createAppServer } from '../src/common/create-app-server'

export const scaffoldTests = () => {
  const dataSource = Container.get(DataSource)

  afterAll(async () => {
    await cleanUpS3()
    await dataSource.destroy()
  })

  beforeEach(async () => {
    await dataSource.synchronize(true)
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

    return createAppServer()
  }

  return { createServer, cleanUpS3 }
}
