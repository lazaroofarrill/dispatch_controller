import {DroneModelEnum} from "../enums/drone-model.enum";
import {DroneStateEnum} from "../enums/drone-state.enum";
import {v4 as uuid} from 'uuid'

export class Drone {
    id: string

    serialNumber: string

    model: DroneModelEnum

    weightLimit: number

    batteryCapacity: number

    state: DroneStateEnum

    constructor(init: Partial<Drone>) {
        this.id = uuid()
    }
}
