import {Drone} from "../model/drone.schema";
import {Service} from "typedi";

@Service()
export abstract class DroneRepository {

    abstract save(drone: Drone): Drone
}
