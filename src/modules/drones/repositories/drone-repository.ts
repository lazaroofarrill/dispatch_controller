import {Drone} from "../models/drone.schema";

export abstract class DroneRepository {

    abstract save(drone: Drone): Drone

    abstract getAvailableDrones(): Drone[]

    abstract findById(droneId: string): Drone | null
}
