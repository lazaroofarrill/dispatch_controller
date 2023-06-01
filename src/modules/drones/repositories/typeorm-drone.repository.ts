import { DroneRepository } from './drone-repository'
import { Drone } from '../models/drone.model'
import { Medicament } from '../../medicaments/models/medicament.model'
import { Repository } from 'typeorm'
import {
  DroneEntity
} from '../../../common/adapters/storage/typeorm/entities/drone.entity'
import { Service } from 'typedi'
import { DroneStateEnum } from '../enums/drone-state.enum'
import {
  MedicamentEntity
} from '../../../common/adapters/storage/typeorm/entities/medicament.entity'
import {
  DroneMedicamentJoinEntity
} from '../../../common/adapters/storage/typeorm/entities/drone-medicament-join.entity'
import { InternalServerError } from '../../../common/exceptions/HttpExceptions'
import {
  getAsyncRepo
} from '../../../common/middlewares/typeorm-transaction-middleware'

@Service()
export class TypeormDroneRepository extends DroneRepository {
  async findById(droneId: string): Promise<Drone | null> {
    const drone = await this.droneRepository.findOne({ where: { id: droneId } })
    if (!drone) return null
    else return drone.toDrone()
  }

  async getAvailableDrones(): Promise<Drone[]> {
    return this.droneRepository.find({
      where: {
        state: DroneStateEnum.IDLE
      }
    }).then(drones => drones.map(drone => drone.toDrone()))
  }

  async getLoadedItems(droneId: string): Promise<{
    medicament: Medicament;
    quantity: number
  }[]> {
    const relatedMedicamentsQueryBuilder = await this.medicamentRepository
      .createQueryBuilder('c')
      .innerJoinAndSelect('droneMedicamentJoin', 'c_drone_medicament_join', 'droneId = :droneId', { droneId })

    const relatedMedicaments = await relatedMedicamentsQueryBuilder.getMany()
    return relatedMedicaments.map(relatedMedicament => ({
      medicament: relatedMedicament.toMedicament(),
      quantity: relatedMedicament.droneMedicamentJoin.quantity
    }))
  }

  async loadItem(droneId: string, medicamentId: string): Promise<boolean> {
    let droneMedicamentJoin = await this.droneMedicamentJoinRepository.findOne({
      where: {
        droneId, medicamentId
      }
    })

    if (!droneMedicamentJoin) {
      droneMedicamentJoin = {
        droneId, medicamentId, quantity: 1
      }
    }

    droneMedicamentJoin.quantity++

    await this.droneMedicamentJoinRepository.save(droneMedicamentJoin)

    return true
  }

  async save(drone: Drone): Promise<Drone> {
    return this.droneRepository.save(drone)
      .then(drone => this.droneRepository.findOne({ where: { id: drone.id } }))
      .then(drone => {
        if (!drone) {
          throw new InternalServerError()
        }
        return drone.toDrone()
      })
  }

  private get droneRepository(): Repository<DroneEntity> {
    return getAsyncRepo(DroneEntity)
  }

  private get medicamentRepository(): Repository<MedicamentEntity> {
    return getAsyncRepo(MedicamentEntity)
  }

  private get droneMedicamentJoinRepository(): Repository<DroneMedicamentJoinEntity> {
    return getAsyncRepo(DroneMedicamentJoinEntity)
  }
}
