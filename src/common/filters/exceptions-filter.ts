import {ErrorRequestHandler} from "express";
import {HttpException} from "../exceptions/HttpExceptions";

const exceptionsFilter: ErrorRequestHandler = (err, req, res, next) => {

    if (err instanceof HttpException) {
        res.status(err.status)
        res.send(err)
    }
}

export {exceptionsFilter}
