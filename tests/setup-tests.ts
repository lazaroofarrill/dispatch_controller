import '../src/common/dependencies'
import { Container } from 'typedi'
import { DataSource } from 'typeorm'

import { testDataSource } from '../src/common/adapters/storage/typeorm/test-data-source'
import { EnvVars } from '../src/env-vars'
import { S3_BUCKET_TOKEN } from '../src/common/adapters/storage/minio/minio-client'
import { jest } from '@jest/globals'

global.jest = jest as any

Container.set(S3_BUCKET_TOKEN, process.env[EnvVars.TEST_S3_BUCKET])
Container.set(DataSource, testDataSource)
