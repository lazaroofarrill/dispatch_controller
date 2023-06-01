import * as Minio from 'minio'

const [endPoint, port] = process.env.S3_URL!.split(':')

export const minioClient = new Minio.Client({
  endPoint,
  port: +port,
  accessKey: process.env.S3_ACCESS_KEY!,
  secretKey: process.env.S3_SECRET!,
  useSSL: false
})
