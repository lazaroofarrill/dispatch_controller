import { Drone } from '../models/drone.model'
import { Medicament } from '../../medicaments/models/medicament.model'

export abstract class DroneRepository {
  abstract save(drone: Drone): Promise<Drone>

  abstract getAvailableDrones(): Promise<Drone[]>

  abstract findById(droneId: string): Promise<Drone | null>

  abstract loadItem(droneId: string, medicamentId: string): Promise<boolean>

  abstract getLoadedItems(droneId: string): Promise<
    {
      medicament: Medicament
      quantity: number
    }[]
  >

  abstract unloadItem(droneId: string, medicamentId: string): Promise<boolean>
}
