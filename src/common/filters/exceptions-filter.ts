import { ErrorRequestHandler } from 'express'
import { HttpException } from '../exceptions/HttpExceptions'

const exceptionsFilter: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof HttpException) {
    res.status(err.status)
    res.send(err)
  } else {
    const httpException = new HttpException()
    res.status(httpException.status)
    res.send(httpException.message)
  }
}

export { exceptionsFilter }
