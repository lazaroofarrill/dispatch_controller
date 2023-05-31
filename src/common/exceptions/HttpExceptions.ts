export class HttpException {
  status: number

  message: string | object

  constructor(message?: string | object) {
    this.status = 500
    this.message = message || "Internal Server Error"
  }
}

export class BadRequestException extends HttpException {
  status = 400

  constructor(message: string | object) {
    super(message || "Bad Request Exception")
  }
}

export class InternalServerError extends HttpException {}
