import '../src/common/dependencies'
import { Container } from 'typedi'
import { DataSource } from 'typeorm'

import {
  S3_BUCKET_TOKEN
} from '../src/common/adapters/storage/minio/common-options'
import {
  testDataSource
} from '../src/common/adapters/storage/typeorm/test-data-source'

Container.set(S3_BUCKET_TOKEN, process.env.TEST_S3_BUCKET)
Container.set(DataSource, testDataSource)
