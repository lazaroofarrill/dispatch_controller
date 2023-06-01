import { ErrorRequestHandler } from 'express'
import { HttpException } from '../exceptions/HttpExceptions'
import {
  asyncLocalStorage,
  TYPEORM_QUERY_RUNNER
} from '../middlewares/typeorm-transaction-middleware'

const exceptionsFilter: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpException) {
    res.status(err.status)
    res.send(err)
  } else {
    const httpException = new HttpException()
    res.status(httpException.status)
    res.send(httpException.message)
  }

  return asyncLocalStorage.getStore()![TYPEORM_QUERY_RUNNER]!.rollbackTransaction()
}

export { exceptionsFilter }
