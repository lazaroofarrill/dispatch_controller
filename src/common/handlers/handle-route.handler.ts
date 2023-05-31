import {RequestHandler} from "express";

export const handleSimpleRoute = (cb: (...args: any) => any) => {
    const requestHandler: RequestHandler = (req, res) => {
        return res.send(cb)
    }
    return requestHandler
}

