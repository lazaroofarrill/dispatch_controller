import {Drone} from "../model/drone.schema";
import {DroneRepository} from "./drone-repository";
import {Service} from "typedi";

const droneStorage: Record<string, Drone> = {}

@Service()
export class InMemoryDroneRepository extends DroneRepository {
    save(drone: Drone): Drone {
        droneStorage[drone.id] = drone
        return drone;
    }
}
