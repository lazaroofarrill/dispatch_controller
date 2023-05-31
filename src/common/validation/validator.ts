import {validateOrReject} from "class-validator";
import {BadRequestException, HttpException} from "../exceptions/HttpExceptions";

export const validateInput = (ctr: any, dto: any) => {
    if (!dto) {
        throw new BadRequestException('object must be defined')
    }

    return validateOrReject(Object.assign(new ctr(), dto), {
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
    })
        .catch(err => {
            throw new BadRequestException(err)
        })
}

export const validateOutput = (ctr: any, dto: any) => {
    return validateInput(ctr, dto).catch((err) => {
        throw new HttpException()
    })
}
