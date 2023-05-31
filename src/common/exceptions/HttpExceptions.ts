export class HttpException {
    status: number

    message: string | Record<string, any>

    constructor(message?: string | Record<string, any>) {
        this.status = 500
        this.message = message || 'Internal Server Error'
    }
}

export class BadRequestException extends HttpException {
    status: number = 400;

    constructor(message: string | Record<string, any>) {
        super(message || 'Bad Request Exception')
    }
}
