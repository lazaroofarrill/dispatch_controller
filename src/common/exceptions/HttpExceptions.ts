export class HttpException {
    status: number

    message: string | Record<string, any>

    constructor() {
        this.status = 500
        this.message = 'Internal Server Error'
    }
}

export class BadRequestException extends HttpException {
    message: string | Record<string, any>;
    status: number = 400;

    constructor(message: string | Record<string, any>) {
        super()
        this.message = message || 'Bad Request Exception'
    }
}
