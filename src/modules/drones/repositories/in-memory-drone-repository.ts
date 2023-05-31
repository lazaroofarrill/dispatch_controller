import {DroneRepository} from "./drone-repository";
import {Service} from "typedi";
import {DroneStateEnum} from "../enums/drone-state.enum";
import {Drone} from "../models/drone.schema";

const droneStorage: Record<string, Drone> = {}

@Service()
export class InMemoryDroneRepository extends DroneRepository {
    save(drone: Drone): Drone {
        droneStorage[drone.id] = drone
        return drone;
    }

    getAvailableDrones(): Drone[] {
        console.log(droneStorage)
        const drones = Object.keys(droneStorage).map(k => droneStorage[k]).filter(drone => drone.state === DroneStateEnum.IDLE)
        console.log(drones)
        return drones
    }

    findById(droneId: string): Drone | null {
        return droneStorage[droneId] || null
    }
}
