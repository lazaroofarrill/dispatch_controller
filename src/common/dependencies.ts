import { Container } from 'typedi'
import {
  DroneRepository
} from '../modules/drones/repositories/drone-repository'
import {
  MedicamentRepository
} from '../modules/medicaments/repositories/medicament.repository'
import {
  TypeormDroneRepository
} from '../modules/drones/repositories/typeorm-drone.repository'
import {
  TypeormMedicamentRepository
} from '../modules/medicaments/repositories/typeorm-medicament.repository'
import { DataSource } from 'typeorm'
import { dataSource } from './adapters/storage/typeorm/data-source'
import { Logger } from './logging/logger'
import { TypeormLogger } from './logging/typeorm-logger'
import { EnvVars } from '../env-vars'
import { S3_BUCKET_TOKEN } from './adapters/storage/minio/minio-client'
import Joi from 'joi'
import 'dotenv/config'

Container.set(DataSource, dataSource)
Container.set(S3_BUCKET_TOKEN, process.env[EnvVars.MINIO_BUCKET])
Container.set(MedicamentRepository, Container.get(TypeormMedicamentRepository))
Container.set(DroneRepository, Container.get(TypeormDroneRepository))
Container.set(Logger, Container.get(TypeormLogger))

type EnvVarsValidationOptions = {
  [M in EnvVars]: Joi.AnySchema
}

const envVarsToValidate: EnvVarsValidationOptions = {
  APP_DB: Joi.string().required(),
  MINIO_BUCKET: Joi.string().required(),
  MINIO_HOST: Joi.string().required(),
  MINIO_PORT: Joi.string().required(),
  MINIO_ROOT_PASSWORD: Joi.string().required(),
  MINIO_ROOT_USER: Joi.string().required(),
  PORT: Joi.number().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  TEST_DB: Joi.string().required(),
  TEST_POSTGRES_HOST: Joi.string().required(),
  TEST_POSTGRES_PORT: Joi.number().required(),
  TEST_S3_BUCKET: Joi.string().required()
}

export const validationSchema = Joi
  .object()
  .keys(envVarsToValidate)
  .unknown()

const { error } = validationSchema.validate(process.env)
if (error) {
  throw new Error(`Invalid environment detected: ${error.message}`)
}
