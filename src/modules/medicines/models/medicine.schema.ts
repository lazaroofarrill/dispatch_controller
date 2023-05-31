import {CommonSchema} from "../../../common/models/common.schema";

export class Medicine extends CommonSchema {
    name: string

    weight: number

    code: string

    image: string

    constructor() {
        super()
    }
}
