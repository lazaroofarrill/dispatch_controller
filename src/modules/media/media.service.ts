import { Service } from 'typedi'
import { minioClient } from '../../common/adapters/storage/minio/minio-client'
import { randomUUID } from 'crypto'
import { isUUID } from 'class-validator'
import { BadRequestException } from '../../common/exceptions/HttpExceptions'


@Service()
export class MediaService {
  readonly bucket = process.env.S3_BUCKET || ''

  async getUploadUrl(key?: string) {
    if (!key) {
      key = randomUUID()
    } else {
      if (!isUUID(key)) {
        throw new BadRequestException('key must be a valid uuid')
      }
    }
    const url = await minioClient.presignedUrl('PUT', this.bucket, key)
      .catch(err => {
        console.log('the key was', key)
        console.log(err)
        throw err
      })
    return {
      key,
      url
    }
  }

  async getPublicUrl(key: string) {
    return {
      url: await minioClient.presignedUrl('GET', this.bucket, key)
    }
  }
}
