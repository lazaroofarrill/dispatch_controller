import {v4 as uuid} from "uuid";

export class CommonSchema {
    id: string

    constructor() {
        this.id = uuid()
    }
}
