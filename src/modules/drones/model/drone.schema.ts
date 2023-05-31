import {DroneModelEnum} from "../enums/drone-model.enum";
import {DroneStateEnum} from "../enums/drone-state.enum";

export class Drone {
    serialNumber: string

    model: DroneModelEnum

    weightLimit: number

    batteryCapacity: number

    state: DroneStateEnum

    constructor(init: Drone) {
        this.serialNumber = init.serialNumber
        this.model = init.model
        this.weightLimit = init.weightLimit
        this.batteryCapacity = init.batteryCapacity
        this.state = init.state
    }
}
