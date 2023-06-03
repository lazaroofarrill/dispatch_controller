export class HttpException extends Error {
  status: number

  message: string

  constructor(message?: string) {
    super()
    this.status = 500
    this.message = message || 'Internal Server Error'
  }
}

export class BadRequestException extends HttpException {
  status = 400

  constructor(message?: string) {
    super(message || 'Bad Request Exception')
  }
}

export class InternalServerError extends HttpException {}
