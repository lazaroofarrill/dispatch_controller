import { validateOrReject } from 'class-validator'
import {
  BadRequestException,
  HttpException,
} from '../exceptions/HttpExceptions'

export const validateInput = (ctr: new () => object, dto: object) => {
  if (!dto) {
    throw new BadRequestException('object must be defined')
  }

  return validateOrReject(Object.assign(new ctr(), dto), {
    forbidUnknownValues: true,
    forbidNonWhitelisted: true,
  }).catch((err) => {
    throw new BadRequestException(err)
  })
}

export const validateOutput = (ctr: new () => object, dto: object) => {
  return validateInput(ctr, dto).catch(() => {
    throw new HttpException('Output Encoding Error')
  })
}
