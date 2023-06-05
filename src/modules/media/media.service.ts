import { Container, Service } from 'typedi'
import {
  minioClient,
  S3_BUCKET_TOKEN,
} from '../../common/adapters/storage/minio/minio-client'
import { randomUUID } from 'crypto'
import { isUUID } from 'class-validator'
import { BadRequestException } from '../../common/exceptions/HttpExceptions'

@Service()
export class MediaService {
  readonly bucket = Container.get<string>(S3_BUCKET_TOKEN)

  async getUploadUrl(key?: string) {
    if (!key) {
      key = randomUUID()
    } else {
      if (!isUUID(key)) {
        throw new BadRequestException('key must be a valid uuid')
      }
    }
    const url = await minioClient.presignedUrl('PUT', this.bucket, key)

    return {
      key,
      url,
    }
  }

  async getPublicUrl(key: string) {
    return {
      url: await minioClient.presignedUrl('GET', this.bucket, key),
    }
  }
}
