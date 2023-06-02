import { Service } from 'typedi'
import {
  validateInput,
  validateOutput,
} from '../../common/validation/validator'
import {
  BadRequestException,
  HttpException,
} from '../../common/exceptions/HttpExceptions'
import { isUUID } from 'class-validator'
import { CreateDroneDto } from './dtos/create-drone.dto'
import { Drone } from './models/drone.model'
import { GetBatteryLevelDto } from './dtos/get-battery-level.dto'
import { DroneRepository } from './repositories/drone-repository'
import { DroneStateEnum } from './enums/drone-state.enum'
import { MedicamentRepository } from '../medicaments/repositories/medicament.repository'

@Service()
export class DroneService {
  constructor(
    private readonly droneRepository: DroneRepository,
    private readonly medicamentRepository: MedicamentRepository
  ) {}

  async registerDrone(createDroneDto: CreateDroneDto) {
    await validateInput(CreateDroneDto, createDroneDto)

    const newDrone = Object.assign(new Drone(), createDroneDto)

    return this.droneRepository.save(newDrone)
  }

  async getAvailableDrones() {
    return this.droneRepository.getAvailableDrones()
  }

  async checkBatteryLevel(droneId: string) {
    if (!isUUID(droneId)) {
      throw new BadRequestException('droneId must be a valid UUID')
    }

    const drone = await this.droneRepository.findById(droneId)

    if (!drone) {
      throw new BadRequestException(`Drone with id: "${droneId}" not found`)
    }

    const batteryLevelDto: GetBatteryLevelDto = {
      batteryCapacity: drone.batteryCapacity,
    }
    await validateOutput(GetBatteryLevelDto, batteryLevelDto)
    return batteryLevelDto
  }

  async loadItem(droneId: string, medicamentId: string) {
    const drone = await this.droneRepository.findById(droneId)
    const medicament = await this.medicamentRepository.findById(medicamentId)

    if (!(drone && medicament)) {
      throw new BadRequestException("Drone or Medicament weren't found")
    }

    if (drone.batteryCapacity < 25) {
      throw new BadRequestException(
        "Drone can't be loaded when the battery is below 25%"
      )
    }

    if (drone.state !== DroneStateEnum.IDLE) {
      throw new BadRequestException('Drone is busy')
    }

    drone.state = DroneStateEnum.LOADING

    await this.droneRepository.save(drone)

    const droneLoadedItems = await this.checkLoadedItems(droneId)

    const loadedWeight = droneLoadedItems.reduce((previous, current) => {
      return previous + current.quantity * medicament.weight
    }, 0)

    if (loadedWeight + medicament.weight > drone.weightLimit) {
      throw new BadRequestException(
        'Weight limit of the drone has been reached'
      )
    }

    await this.droneRepository.loadItem(droneId, medicamentId)

    const loadedDrone = await this.droneRepository.findById(droneId)
    if (!loadedDrone) {
      throw new HttpException(
        'Underlying storage was modified while executing change'
      )
    }

    loadedDrone.state = DroneStateEnum.IDLE

    await this.droneRepository.save(loadedDrone)
    return true
  }

  async checkLoadedItems(droneId: string) {
    return this.droneRepository.getLoadedItems(droneId)
  }
}
