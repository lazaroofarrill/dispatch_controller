import {Drone} from "../models/drone.schema";
import {Medicament} from "../../medicines/models/medicine.schema";

export abstract class DroneRepository {

    abstract save(drone: Drone): Drone

    abstract getAvailableDrones(): Drone[]

    abstract findById(droneId: string): Drone | null

    abstract loadItem(droneId: string, medicamentId: string): Promise<boolean>

    abstract getLoadedItems(droneId: string): Promise<{
        medicament: Medicament,
        quantity: number
    }[]>
}
