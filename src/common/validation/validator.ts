import { validateOrReject, ValidationError } from 'class-validator'
import {
  BadRequestException,
  HttpException,
} from '../exceptions/HttpExceptions'
import { plainToInstance } from 'class-transformer'

const validateObject = <T extends object>(ctr: new () => T, dto: object) => {
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

export const validateInput = <T extends object>(
  ctr: new () => T,
  dto: object
) => {
  return validateObject(ctr, dto).catch((err) => {
    throw new BadRequestException(err)
  })
}

export const validateOutput = <T extends object>(
  ctr: new () => T,
  dto: object
) => {
  const object = plainToInstance(ctr, dto)
  return validateObject(ctr, dto)
    .then(() => object)
    .catch((err) => {
      console.log(err)
      throw new HttpException('Output Encoding Error')
    })
}
