import {Service} from "typedi";
import {Drone} from "../models/drone.schema";

@Service()
export abstract class DroneRepository {

    abstract save(drone: Drone): Drone

    abstract getAvailableDrones(): Drone[]
}
