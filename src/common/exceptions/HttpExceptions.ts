export class HttpException {
    status: number

    message: string

    constructor() {
        this.status = 500
        this.message = 'Internal Server Error'
    }
}

export class BadRequestException extends HttpException {
    message: string;
    status: number = 400;

    constructor(message: string) {
        super()
        this.message = message || 'Bad Request Exception'
    }
}
