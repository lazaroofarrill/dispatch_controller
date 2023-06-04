import { ErrorRequestHandler } from 'express'
import { HttpException } from '../exceptions/HttpExceptions'
import { Logger } from '../logging/logger'

const exceptionsFilter: ErrorRequestHandler = (err, req, res, _next) => {
  const logger = new Logger()

  if (err instanceof HttpException) {
    res.status(err.status)
    if (err.status === 500) {
      logger.error(err)
    }
    res.send(err)
  } else {
    const httpException = new HttpException()
    res.status(httpException.status)
    res.send(httpException.message)
    logger.error(err)
  }
}

export { exceptionsFilter }
