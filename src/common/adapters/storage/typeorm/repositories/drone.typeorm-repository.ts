import {
  DroneRepository
} from '../../../../../modules/drones/repositories/drone-repository'
import { Drone } from '../../../../../modules/drones/models/drone.model'
import {
  Medicament
} from '../../../../../modules/medicaments/models/medicament.model'
import { Repository } from 'typeorm'
import { DroneEntity } from '../entities/drone.entity'
import { dataSource } from '../data-source'
import { Service } from 'typedi'
import {
  DroneStateEnum
} from '../../../../../modules/drones/enums/drone-state.enum'

@Service()
export class DroneTypeormRepository extends DroneRepository {
  droneRepository: Repository<DroneEntity>

  constructor() {
    super()
    this.droneRepository = dataSource.getRepository(DroneEntity)
  }

  async findById(droneId: string): Promise<Drone | null> {
    return this.droneRepository.findOne({ where: { id: droneId } })
  }

  async getAvailableDrones(): Promise<Drone[]> {
    return this.droneRepository.find({
      where: {
        state: DroneStateEnum.IDLE
      }
    })
  }

  getLoadedItems(droneId: string): Promise<{
    medicament: Medicament;
    quantity: number
  }[]> {
    return Promise.resolve([])
  }

  loadItem(droneId: string, medicamentId: string): Promise<boolean> {
    return Promise.resolve(false)
  }

  async save(drone: Drone): Promise<Drone> {
    return this.droneRepository.save(drone)
  }

}
