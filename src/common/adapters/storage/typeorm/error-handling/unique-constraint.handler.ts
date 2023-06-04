import { QueryFailedError } from 'typeorm'
import { BadRequestException } from '../../../../exceptions/HttpExceptions'

export const uniqueConstraintHandler = (err: any) => {
  if (err instanceof QueryFailedError) {
    if (err.driverError.code === '23505') {
      throw new BadRequestException('Unique key constraint failed')
    }
  }

  throw err
}
