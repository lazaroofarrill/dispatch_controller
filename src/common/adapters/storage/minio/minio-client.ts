import * as Minio from 'minio'
import { commonOptions } from './common-options'

const [endPoint, port] = process.env.S3_URL!.split(':')

export const minioClient = new Minio.Client({
  endPoint,
  port: +port,
  ...commonOptions
})
