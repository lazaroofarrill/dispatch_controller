import {DroneRepository} from "./drone-repository";
import {Service} from "typedi";
import {DroneStateEnum} from "../enums/drone-state.enum";
import {Drone} from "../models/drone.schema";
import {Medicament} from "../../medicines/models/medicine.schema";
import {
    MedicamentRepository
} from "../../medicines/repositories/medicament.repository";
import {HttpException} from "../../../common/exceptions/HttpExceptions";

const droneStorage: Record<string, Drone> = {}

export let droneToMedicamentJoin: {
    droneId: string,
    medicamentId: string,
    quantity: number
}[] = []

@Service()
export class InMemoryDroneRepository extends DroneRepository {
    constructor(private readonly medicamentRepository: MedicamentRepository) {
        super();
    }

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

    async loadItem(droneId: string, medicamentId: string): Promise<boolean> {
        let row: {
            droneId: string;
            medicamentId: string;
            quantity: number
        } | undefined = droneToMedicamentJoin
            .find(join =>
                join.droneId === droneId && join.medicamentId === medicamentId)

        if (!row) {
            row = {
                droneId,
                medicamentId,
                quantity: 0
            }
        }
        row.quantity++

        droneToMedicamentJoin = droneToMedicamentJoin.filter(join =>
            join.droneId !== droneId && join.medicamentId !== medicamentId)

        droneToMedicamentJoin.push(row)

        return true
    }

    async getLoadedItems(droneId: string): Promise<
        {
            medicament: Medicament;
            quantity: number
        }[]> {
        const joins = droneToMedicamentJoin.filter(
            join => join.droneId === droneId
        )
        return await Promise.all(
            joins.map(async join => {
                const medicament = await this.medicamentRepository.findById(join.medicamentId)
                if (!medicament) {
                    throw new HttpException()
                }
                return {
                    medicament,
                    quantity: join.quantity
                }
            }))
    }
}
