import {DroneModelEnum} from "../enums/drone-model.enum";
import {DroneStateEnum} from "../enums/drone-state.enum";
import {CommonSchema} from "../../../common/models/common.schema";

export class Drone extends CommonSchema {
    serialNumber: string

    model: DroneModelEnum

    weightLimit: number

    batteryCapacity: number

    state: DroneStateEnum

    constructor() {
        super()
    }
}
