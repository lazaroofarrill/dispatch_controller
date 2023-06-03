import { isArray, validateOrReject, ValidationError } from 'class-validator'
import {
  BadRequestException,
  InternalServerError,
} from '../exceptions/HttpExceptions'
import { plainToInstance } from 'class-transformer'

const validateObject = async <T extends object>(
  ctr: new () => T,
  dto: object
) => {
  if (!dto) {
    throw Error('Object for validation cannot be undefined')
  }

  const instance = plainToInstance(ctr, dto)

  return validateOrReject(instance, {
    forbidUnknownValues: true,
    forbidNonWhitelisted: true,
  })
    .then(() => instance)
    .catch((errors: ValidationError[]) => {
      throw JSON.stringify(
        errors.map((validationError) => validationError.constraints).flat()
      )
    })
}

export const validateInput = <T extends object>(
  ctr: new () => T,
  dto: object
) => {
  return validateObject(ctr, dto).catch((err) => {
    const message = err instanceof Error ? err.message : err
    throw new BadRequestException(message)
  })
}

export const validateOutput: <T extends object>(
  ctr: {
    new (): T
  },
  dto: object
) => Promise<T | T[]> = <T extends object>(ctr: new () => T, dto: object) => {
  const error = new InternalServerError('Output Encoding Error')
  if (isArray(dto)) {
    return Promise.all(dto.map((d) => validateObject(ctr, d))).catch((err) => {
      console.log(err)
      throw error
    })
  } else {
    return validateObject(ctr, dto).catch((err) => {
      console.error(err)
      throw error
    })
  }
}
