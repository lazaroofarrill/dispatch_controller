import { DroneRepository } from './drone-repository'
import { Drone } from '../models/drone.model'
import { Medicament } from '../../medicaments/models/medicament.model'
import { Repository } from 'typeorm'
import { DroneEntity } from '../../../common/adapters/storage/typeorm/entities/drone.entity'
import { Service } from 'typedi'
import { DroneStateEnum } from '../enums/drone-state.enum'
import { DroneMedicamentJoinEntity } from '../../../common/adapters/storage/typeorm/entities/drone-medicament-join.entity'
import {
  BadRequestException,
  InternalServerError,
} from '../../../common/exceptions/HttpExceptions'
import { getAsyncRepo } from '../../../common/adapters/storage/typeorm/middlewares/typeorm-transaction-middleware'
import { UpdateDroneDto } from '../dtos/update-drone.dto'
import { uniqueConstraintHandler } from '../../../common/adapters/storage/typeorm/error-handling/unique-constraint.handler'

@Service()
export class TypeormDroneRepository extends DroneRepository {
  async findById(droneId: string): Promise<Drone | null> {
    const drone = await this.droneRepository.findOne({ where: { id: droneId } })
    if (!drone) return null
    else return drone.toDrone()
  }

  async getAvailableDrones(): Promise<Drone[]> {
    return this.droneRepository
      .find({
        where: {
          state: DroneStateEnum.IDLE,
        },
      })
      .then((drones) => drones.map((drone) => drone.toDrone()))
  }

  async getLoadedItems(droneId: string): Promise<
    {
      medicament: Medicament
      quantity: number
    }[]
  > {
    const droneMedicamentJoins = await this.droneMedicamentJoinRepository
      .createQueryBuilder('c')
      .andWhere('drone_id = :droneId', { droneId })
      .innerJoinAndSelect(
        'c.medicament',
        'c_medicaments',
        'c_medicaments.id = c.medicament_id'
      )
      .getMany()

    return droneMedicamentJoins.map((droneMedicamentJoin) => ({
      medicament: droneMedicamentJoin.medicament as any,
      quantity: droneMedicamentJoin.quantity,
    }))
  }

  async loadItem(droneId: string, medicamentId: string): Promise<boolean> {
    let droneMedicamentJoin = await this.droneMedicamentJoinRepository.findOne({
      where: {
        droneId,
        medicamentId,
      },
    })

    if (!droneMedicamentJoin) {
      droneMedicamentJoin = {
        droneId,
        medicamentId,
        quantity: 0,
      }
    }

    droneMedicamentJoin.quantity++

    await this.droneMedicamentJoinRepository.save(droneMedicamentJoin)

    return true
  }

  async save(drone: Drone): Promise<Drone> {
    return this.droneRepository
      .save(drone)
      .then((drone) =>
        this.droneRepository.findOne({ where: { id: drone.id } })
      )
      .then((drone) => {
        if (!drone) {
          throw new InternalServerError()
        }
        return drone.toDrone()
      })
      .catch((err) => uniqueConstraintHandler(err))
  }

  async unloadItem(droneId: string, medicamentId: string) {
    const droneMedicamentJoin =
      await this.droneMedicamentJoinRepository.findOne({
        where: {
          droneId,
          medicamentId,
        },
      })

    if (!droneMedicamentJoin) {
      throw new BadRequestException('This item is not loaded in the drone')
    }

    if (droneMedicamentJoin.quantity > 0) {
      droneMedicamentJoin.quantity--
    }

    if (droneMedicamentJoin.quantity === 0) {
      await this.droneMedicamentJoinRepository.remove(droneMedicamentJoin)
    } else {
      await this.droneMedicamentJoinRepository.save(droneMedicamentJoin)
    }

    return true
  }

  updateDrone(droneId: string, updateDroneDto: UpdateDroneDto): Promise<Drone> {
    return this.droneRepository
      .update(droneId, updateDroneDto)
      .then(() => this.droneRepository.findOne({ where: { id: droneId } }))
      .then((result) => {
        if (!result) {
          throw new InternalServerError(
            'Invalid state. The updated drone must exist.'
          )
        }
        return result.toDrone()
      })
      .catch((err) => uniqueConstraintHandler(err))
  }

  async findAll(): Promise<Drone[]> {
    return this.droneRepository
      .find()
      .then((result) => result.map((r) => r.toDrone()))
  }

  async removeDrone(droneId: string): Promise<void> {
    await this.droneMedicamentJoinRepository
      .find({ where: { droneId } })
      .then((results) => this.droneMedicamentJoinRepository.remove(results))
    return this.droneRepository.delete({ id: droneId }).then(() => undefined)
  }

  private get droneRepository(): Repository<DroneEntity> {
    return getAsyncRepo(DroneEntity)
  }

  private get droneMedicamentJoinRepository(): Repository<DroneMedicamentJoinEntity> {
    return getAsyncRepo(DroneMedicamentJoinEntity)
  }
}
