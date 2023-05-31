import {validateOrReject} from "class-validator";
import {BadRequestException} from "../exceptions/HttpExceptions";

export const validateDto: (ctr: any, dto: any) => Promise<void> = (ctr: any, dto: any) => {
    return validateOrReject(Object.assign(new ctr(), dto), {
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
    })
        .catch(err => {
            throw new BadRequestException(err)
        })
}

