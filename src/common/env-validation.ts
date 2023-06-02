import { EnvVars } from '../env-vars'
import Joi from 'joi'

type EnvVarsValidationOptions = {
  [M in EnvVars]: Joi.AnySchema
}

const envVarsToValidate: EnvVarsValidationOptions = {
  APP_DB: Joi.string().required(),
  MINIO_BUCKET: Joi.string().required(),
  MINIO_HOST: Joi.string().required(),
  MINIO_PORT: Joi.string().optional(),
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
  TEST_S3_BUCKET: Joi.string().required(),
}

export const validationSchema = Joi.object().keys(envVarsToValidate).unknown()

const { error } = validationSchema.validate(process.env)
if (error) {
  throw new Error(`Invalid environment detected: ${error.message}`)
}
