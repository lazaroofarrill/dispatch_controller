import * as Minio from 'minio'
import { EnvVars } from '../../../../env-vars'

export const S3_BUCKET_TOKEN = 'S3_BUCKET_TOKEN'

export const minioClient = new Minio.Client({
  endPoint: process.env[EnvVars.MINIO_HOST] || '',
  port: +(process.env[EnvVars.MINIO_PORT] || ''),
  accessKey: process.env[EnvVars.MINIO_ROOT_USER] || '',
  secretKey: process.env[EnvVars.MINIO_ROOT_PASSWORD] || '',
  useSSL: false,
})
