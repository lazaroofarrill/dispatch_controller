import { validateOrReject, ValidationError } from 'class-validator'
import {
  BadRequestException,
  HttpException,
} from '../exceptions/HttpExceptions'

const validateObject = (ctr: new () => object, dto: object) => {
  if (!dto) {
    throw Error('Object for validation cannot be undefined')
  }

  return validateOrReject(Object.assign(new ctr(), dto), {
    forbidUnknownValues: true,
    forbidNonWhitelisted: true,
  }).catch((errors: ValidationError[]) => {
    throw errors.map((validationError) => validationError.constraints).flat()
  })
}

export const validateInput = (ctr: new () => object, dto: object) => {
  return validateObject(ctr, dto).catch((err) => {
    throw new BadRequestException(err)
  })
}

export const validateOutput = (ctr: new () => object, dto: object) => {
  return validateObject(ctr, dto).catch(() => {
    throw new HttpException('Output Encoding Error')
  })
}
